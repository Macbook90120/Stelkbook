// authContext.js
'use client';
import { createContext, useState, useEffect, useContext } from 'react';
import axios from '../utils/axios';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/user');
        setUser(res.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  const login = async (form) => {
    try {
      const res = await axios.post('/login', form);
      localStorage.setItem('auth_token', res.data.token);
      setUser(res.data.user);

      // Redirect setelah login berhasil
      if (res.data.user.role === 'admin') {
        router.push('/admin');
      } else if (res.data.user.role === 'perpus') {
        router.push('/perpustakaan');
      } else if (res.data.user.role === 'guru') {
        router.push('/homepage_guru');
      } else {
        router.push('/homepage');
      }
    } catch (e) {
      console.error('Login failed:', e);
    }
  };

  const register = async (name, email, password, kode, role, gender, sekolah) => {
    try {
      await axios.post('/register', {
        name,
        email,
        password,
        kode,
        role,
        gender,
        sekolah,
      });
      router.push('/login');
    } catch (e) {
      console.error('Registration failed:', e);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/logout');
      localStorage.removeItem('auth_token');
      setUser(null);
      router.push('/login');
    } catch (e) {
      console.error('Logout failed:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);