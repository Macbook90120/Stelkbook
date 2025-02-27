// authContext.js
'use client';
import { createContext, useState, useEffect, useContext } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Gagal mengambil data pengguna:", error);
        localStorage.removeItem('auth_token');
        setUser({});
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (form) => {
    if (!form.kode || !form.password) {
      throw new Error("Kode dan password harus diisi.");
    }
  
    try {
      const res = await axios.post('/login', form);
      localStorage.setItem('auth_token', res.data.access_token);
      setUser(res.data.user); // Simpan data pengguna
  
      // Redirect berdasarkan role
      switch (res.data.user.role) {
        case 'Admin':
          router.push('/admin');
          break;
        case 'Guru':
          router.push('/homepage_guru');
          break;
        case 'Perpus':
          router.push('/perpustakaan');
          break;
        default:
          router.push('/homepage'); // Default fallback
      }
    } catch (e) {
      console.error("Login gagal:", e.response?.data?.message || e.message);
      throw new Error("Login gagal, periksa kembali kode dan password.");
    }
  };

  const register = async (username, email, password, kode, role, gender, sekolah) => {
    try {
      await axios.post('/register', { username, email, password, kode, role, gender, sekolah });
      router.push('/login');
    } catch (e) {
      console.error("Registrasi gagal:", e);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/logout', null, {
        headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` },
      });
    } catch (e) {
      console.error("Logout gagal:", e);
    } finally {
      localStorage.removeItem('auth_token');
      setUser({});
      router.push('/login');
    }
  };

  const changePassword = async (oldPassword, newPassword,confirmPassword) => {
    try {
      const token = localStorage.getItem('auth_token');
      console.log("Token yang digunakan:", token); // Debugging
  
      if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");
  
      const res = await axios.post('/change-password', 
        { oldPassword, newPassword , confirmPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      return res.data;
    } catch (e) {
      console.error("Gagal mengganti password:", e.response?.data?.message || e.message);
      throw new Error(e.response?.data?.message || "Gagal mengganti password.");
    }
  };
  

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register,changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);