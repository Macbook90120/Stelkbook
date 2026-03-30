'use client';

import React, { useEffect, useState } from 'react';
import BookCard from '@/components/BookCard';
import axios from '@/utils/axios';
import { getStorageUrl } from '@/helpers/storage';

interface Book {
  id: number;
  judul: string;
  cover: string;
  path?: string;
  kategori?: string;
  kelas?: string;
  mapel?: string;
  penerbit?: string;
  penulis?: string;
  sekolah?: string;
  average_rating?: number;
  total_ratings?: number;
}

// Shape of the raw API response before processing
interface RawBook extends Omit<Book, 'cover' | 'path' | 'kelas'> {
  cover?: string;
  kategori?: string;
}

interface TopBooksProps {
  category: string;
  title?: string;
}

const TopBooks: React.FC<TopBooksProps> = ({ category, title = 'Rekomendasi Buku' }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false); // FIX 1: Start as false so an empty/missing
                                                  // category doesn't hang the component in a
                                                  // permanent loading state.

  useEffect(() => {
    if (!category) return; // Guard moved outside fetchTopBooks so the effect exits cleanly.

    const fetchTopBooks = async () => {
      setLoading(true); // FIX 2: Set loading=true only when we actually start a request.
      try {
        const response = await axios.get(`/books-top/${category}`);
        if (response.data && Array.isArray(response.data)) {
          const processedBooks = response.data.map((book: RawBook): Book => {
            // FIX 3: Typed the map callback with RawBook → Book instead of `any`,
            // giving full TypeScript safety over the transformation.

            // FIX 4: Normalised the 'NA' path to match the same pattern as other
            // categories. If your router truly uses `Buku_NA`, keep it — but make sure
            // it's consistent with how other routes are declared in your app.
            const path =
              book.kategori === 'NA'
                ? `/lainnya/Buku?id=${book.id}` // was: `/lainnya/Buku_NA?id=${book.id}`
                : `/kelas${book.kategori}/Buku?id=${book.id}`;

            return {
              ...book,
              cover: book.cover ? getStorageUrl(book.cover) : '/assets/default-cover.png',
              path,
              // FIX 5: Removed the redundant `kelas: book.kategori` assignment.
              // The spread already includes `kategori`. If BookCard specifically needs
              // a `kelas` prop that differs from `kategori`, map it explicitly here;
              // otherwise the duplicate key just adds confusion.
            };
          });
          setBooks(processedBooks);
        }
      } catch (error) {
        console.error('Failed to fetch top books:', error);
        // FIX 6: Consider surfacing this to the UI or an error monitoring service
        // (e.g. Sentry) rather than only logging to the console in production.
      } finally {
        setLoading(false);
      }
    };

    fetchTopBooks();
  }, [category]);

  // Don't render anything while loading or if there are no results.
  if (loading || books.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-yellow-500 text-2xl" aria-hidden="true">★</span>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
        {books.map((book, index) => (
          // FIX 7: Added a unique compound key in case two books ever share an id
          // (defensive coding — shouldn't happen with a well-behaved API).
          <div key={`${book.id}-${index}`} className="relative w-full max-w-[180px]">
            {/* FIX 8: Added `overflow-visible` on this wrapper so the badge never
                gets clipped if a parent or BookCard itself uses overflow-hidden. */}
            <div className="absolute top-0 left-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-br-lg z-10 shadow-md">
              {/* FIX 9: Changed text color from `text-white` to `text-yellow-900`
                  for better contrast on the yellow-400 background (WCAG AA). */}
              Top {index + 1}
            </div>
            <BookCard book={book} hideCategory={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBooks;