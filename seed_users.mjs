import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const users = [
    {
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123',
        kode: 'ADMIN001',
        role: 'Admin',
        gender: 'Laki-laki',
        sekolah: '',
        kelas: ''
    },
    {
        username: 'siswa',
        email: 'siswa@example.com',
        password: 'siswa123',
        kode: 'SISWA001',
        role: 'Siswa',
        gender: 'Laki-laki',
        sekolah: 'SMK',
        kelas: 'X'
    },
    {
        username: 'guru',
        email: 'guru@example.com',
        password: 'guru123',
        kode: 'guru',
        role: 'Guru',
        gender: 'Perempuan',
        sekolah: 'SMK',
        kelas: ''
    }
];

async function registerUser(user) {
    try {
        const formData = new FormData();
        formData.append('username', user.username);
        formData.append('email', user.email);
        formData.append('password', user.password);
        formData.append('kode', user.kode);
        formData.append('role', user.role);
        formData.append('gender', user.gender);
        if (user.sekolah) formData.append('sekolah', user.sekolah);
        if (user.kelas) formData.append('kelas', user.kelas);

        // We don't append avatar as it's optional and we don't have a file

        console.log(`Registering ${user.username}...`);
        const response = await axios.post(`${API_URL}/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(`Successfully registered ${user.username}`);
    } catch (error) {
        if (error.response) {
            console.error(`Failed to register ${user.username}:`, error.response.data);
        } else if (error.code === 'ECONNREFUSED') {
            console.error(`Failed to register ${user.username}: Connection refused. Is the backend running at ${API_URL}?`);
        } else {
            console.error(`Failed to register ${user.username}:`, error.message);
        }
    }
}

async function main() {
    for (const user of users) {
        await registerUser(user);
    }
}

main();
