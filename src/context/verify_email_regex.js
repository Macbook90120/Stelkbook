
const googleDomainRegex = /@(?:gmail\.com|googlemail\.com|google\.com)$/i;

const testCases = [
  { email: 'test@gmail.com', expected: true },
  { email: 'test@googlemail.com', expected: true },
  { email: 'test@google.com', expected: true },
  { email: 'TEST@GMAIL.COM', expected: true },
  { email: 'test@yahoo.com', expected: false },
  { email: 'test@gmail.com.fake', expected: false },
  { email: 'test@gmail.co', expected: false },
  { email: 'gmail.com', expected: false }, // Missing @, but this is handled by other regex
  { email: 'test@sub.google.com', expected: false }, // My regex expects exact domain match at end, let's check if subdomains are allowed? User said "belong to legitimate Google domains". Usually subdomains like student.google.com might exist but for public registration usually it's just gmail.com.
  // The user prompt: "such as @gmail.com, @googlemail.com, @google.com, or other verified Google services"
  // If I want to allow subdomains, I should change regex. But for now exact match is safer.
];

console.log("Running Regex Verification...");
let passed = 0;
let failed = 0;

testCases.forEach(({ email, expected }) => {
  const result = googleDomainRegex.test(email);
  if (result === expected) {
    passed++;
  } else {
    console.error(`FAILED: ${email} -> Expected ${expected}, got ${result}`);
    failed++;
  }
});

console.log(`Passed: ${passed}, Failed: ${failed}`);

if (failed === 0) {
    console.log("All tests passed!");
} else {
    process.exit(1);
}
