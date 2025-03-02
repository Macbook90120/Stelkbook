'use client';
import { createContext, useState, useEffect, useContext } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [siswaData, setSiswaData] = useState(null);
  const [guruData, setGuruData] = useState(null);
  const [perpusData, setPerpusData] = useState(null);
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

  const fetchSiswa = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");
  
      const res = await axios.get('siswa', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSiswaData(res.data);
    } catch (e) {
      console.error("Gagal mengambil data siswa:", e.response?.data?.message || e.message);
      throw new Error(e.response?.data?.message || "Gagal mengambil data siswa.");
    }
  };
  
  const fetchGuru = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");
  
      const res = await axios.get('/guru', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGuruData(res.data);
    } catch (e) {
      console.error("Gagal mengambil data guru:", e.response?.data?.message || e.message);
      throw new Error(e.response?.data?.message || "Gagal mengambil data guru.");
    }
  };
  
  const fetchPerpus = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");
  
      const res = await axios.get('/perpus', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPerpusData(res.data);
    } catch (e) {
      console.error("Gagal mengambil data perpus:", e.response?.data?.message || e.message);
      throw new Error(e.response?.data?.message || "Gagal mengambil data perpus.");
    }
  };

  const login = async (form) => {
    if (!form.kode || !form.password) {
      throw new Error("Kode dan password harus diisi.");
    }

    try {
      const res = await axios.post('/login', form);
      localStorage.setItem('auth_token', res.data.access_token);
      setUser(res.data.user);

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
          router.push('/homepage');
      }
    } catch (e) {
      console.error("Login gagal:", e.response?.data?.message || e.message);
      throw new Error("Login gagal, periksa kembali kode dan password.");
    }
  };

  const register = async (username, email, password, kode, role, gender, sekolah) => {
    try {
      await axios.post('/register', { username, email, password, kode, role, gender, sekolah });
      router.push('/');
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
      router.push('/');
    }
  };

  const changePassword = async (oldPassword, newPassword, confirmPassword) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

      const res = await axios.post('/change-password', 
        { oldPassword, newPassword, confirmPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return res.data;
    } catch (e) {
      console.error("Gagal mengganti password:", e.response?.data?.message || e.message);
      throw new Error(e.response?.data?.message || "Gagal mengganti password.");
    }
  };

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");
  
      // Kirim permintaan penghapusan user dengan ID tertentu
      await axios.delete(`/delete-user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      return { message: "User berhasil dihapus." };
    } catch (e) {
      console.error("Gagal menghapus user:", e.response?.data?.message || e.message);
      throw new Error(e.response?.data?.message || "Gagal menghapus user.");
    }
  };

  const updateUser = async (id, form) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");
  
      // Kirim permintaan pembaruan user dengan ID tertentu
      const res = await axios.post(`/update-user/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Jika user yang diperbarui adalah user yang sedang login, perbarui state user
      if (user.id === id) {
        setUser(res.data.user);
      }
  
      return res.data;
    } catch (e) {
      console.error("Gagal memperbarui user:", e.response?.data?.message || e.message);
      throw new Error(e.response?.data?.message || "Gagal memperbarui user.");
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      siswaData, 
      guruData, 
      perpusData, 
      login, 
      logout, 
      register, 
      changePassword, 
      deleteUser, 
      updateUser, 
      fetchSiswa, 
      fetchGuru, 
      fetchPerpus 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);