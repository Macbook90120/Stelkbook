'use client'
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from '../utils/axios'; // Pastikan path ini sesuai dengan struktur proyek Anda

const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [siswaBooks, setSiswaBooks] = useState([]);
    const [guruBooks, setGuruBooks] = useState([]);
    const [perpusBooks, setPerpusBooks] = useState([]);
    const [nonAkademikBooks, setNonAkademikBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fungsi untuk mengambil semua buku
    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/books');
            setBooks(response.data.books);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fungsi untuk mengambil buku siswa
    const fetchSiswaBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/books-siswa');
            setSiswaBooks(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fungsi untuk mengambil buku guru
    const fetchGuruBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/books-guru');
            setGuruBooks(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fungsi untuk mengambil buku perpus
    const fetchPerpusBooks = useCallback(async () => {
        setLoading(true);
        try {
          const response = await axios.get('/books-perpus');
          console.log('Response from API:', response.data); // Debugging
          setPerpusBooks(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }, []);

     

    // Fungsi untuk mengambil buku non akademik
    const fetchNonAkademikBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/books-non-akademik');
            setNonAkademikBooks(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchBookById = useCallback(async (id) => {
        setLoading(true);
        try {
            const response = await axios.get(`/books/${id}`);
            return response.data;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }); 

    // Fungsi untuk mengambil dan menampilkan file PDF
    const getBookPdfUrl = useCallback(async (id)=> {
        try {
          // ✅ Gunakan URL langsung ke endpoint PDF
          return `http://localhost:8000/api/books/preview/${id}`
        } catch (error) {
          console.error("Gagal mendapatkan URL PDF:", error)
          throw error
        }
      }, [])
      
    

    // Fungsi untuk mengambil buku siswa berdasarkan ID
    const fetchSiswaBookById = async (id) => {
        setLoading(true);
        try {
            const response = await axios.get(`/books/siswa/${id}`);
            return response.data;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fungsi untuk mengambil buku guru berdasarkan ID
    const fetchGuruBookById = async (id) => {
        setLoading(true);
        try {
            const response = await axios.get(`/books/guru/${id}`);
            return response.data;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fungsi untuk mengambil buku perpus berdasarkan ID
    const fetchPerpusBookById = useCallback(async (id) => {
        setLoading(true);
        try {
            const response = await axios.get(`/books-perpus/${id}`);
            return response.data;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    });

    // Fungsi untuk mengambil buku non akademik berdasarkan ID
    const fetchNonAkademikBookById = async (id) => {
        setLoading(true);
        try {
            const response = await axios.get(`/books/non-akademik/${id}`);
            return response.data;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fungsi untuk menambahkan buku baru
    const addBook = async (bookData) => {
        setLoading(true);
        try {
            const response = await axios.post('/books', bookData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setBooks((prevBooks) => [...prevBooks, response.data.book]);
            return response.data;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fungsi untuk memperbarui buku
    const updateBook = async (id, bookData) => {
        setLoading(true);
        try {
            const response = await axios.post(`/books/${id}`, bookData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setBooks((prevBooks) =>
                prevBooks.map((book) =>
                    book.id === id ? response.data.book : book
                )
            );
            return response.data;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fungsi untuk menghapus buku
    const deleteBook = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`/books/${id}`);
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Ambil data buku saat komponen pertama kali di-mount
    useEffect(() => {
        fetchBooks();
        fetchSiswaBooks();
        fetchGuruBooks();
        fetchPerpusBooks();
        fetchNonAkademikBooks();
    }, []);

    return (
        <BookContext.Provider
            value={{
                books,
                siswaBooks,
                guruBooks,
                perpusBooks,
                nonAkademikBooks,
                loading,
                error,
                fetchBooks,
                fetchSiswaBooks,
                fetchGuruBooks,
                fetchPerpusBooks,
                fetchNonAkademikBooks,
                fetchSiswaBookById,
                fetchGuruBookById,
                fetchPerpusBookById,
                fetchNonAkademikBookById,
                fetchBookById,
                getBookPdfUrl,
                addBook,
                updateBook,
                deleteBook,
            }}
        >
            {children}
        </BookContext.Provider>
    );
};

export const useBook = () => useContext(BookContext);