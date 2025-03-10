'use client';
import { createContext, useState, useEffect, useContext,useCallback } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [siswaData, setSiswaData] = useState(null);
  const [guruData, setGuruData] = useState(null);
  const [perpusData, setPerpusData] = useState(null);
  const [siswaDetail, setSiswaDetail] = useState(null); // State untuk data siswa spesifik
  const [guruDetail, setGuruDetail] = useState(null); // State untuk data guru spesifik
  const [perpusDetail, setPerpusDetail] = useState(null); // State untuk data perpus spesifik
  const router = useRouter();

  // Fetch user data on initial load
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

 // Fetch siswa data by ID
 const fetchSiswa = useCallback(async (id) => {
  if (!id) throw new Error("ID siswa harus diberikan.");

  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

    const res = await axios.get(`/siswa/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setSiswaDetail(res.data); // Simpan data spesifik ke state siswaDetail
  } catch (e) {
    console.error("Gagal mengambil data siswa:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal mengambil data siswa.");
  }
}, []);

// Fetch guru data by ID
const fetchGuru = useCallback(async (id) => {
  if (!id) throw new Error("ID guru harus diberikan.");

  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

    const res = await axios.get(`/guru/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setGuruDetail(res.data); // Simpan data spesifik ke state guruDetail
  } catch (e) {
    console.error("Gagal mengambil data guru:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal mengambil data guru.");
  }
},[]); 

// Fetch perpus data by ID
const fetchPerpus = useCallback(async (id) => {
  if (!id) throw new Error("ID perpus harus diberikan.");

  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

    const res = await axios.get(`/perpus/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setPerpusDetail(res.data); // Simpan data spesifik ke state perpusDetail
  } catch (e) {
    console.error("Gagal mengambil data perpus:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal mengambil data perpus.");
  }
},[]); 

// Fetch all siswa data
const fetchAllSiswa = useCallback(async () => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

    const res = await axios.get('/siswa', {
      headers: { Authorization: `Bearer ${token}` },
    });

    setSiswaData(res.data); // Simpan semua data ke state siswaData
  } catch (e) {
    console.error("Gagal mengambil data siswa:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal mengambil data siswa.");
  }
},[]);

// Fetch all guru data
const fetchAllGuru = useCallback(async () => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

    const res = await axios.get('/guru', {
      headers: { Authorization: `Bearer ${token}` },
    });

    setGuruData(res.data); // Simpan semua data ke state guruData
  } catch (e) {
    console.error("Gagal mengambil data guru:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal mengambil data guru.");
  }
},[]);

// Fetch all perpus data
const fetchAllPerpus = useCallback(async () => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

    const res = await axios.get('/perpus', {
      headers: { Authorization: `Bearer ${token}` },
    });

    setPerpusData(res.data); // Simpan semua data ke state perpusData
  } catch (e) {
    console.error("Gagal mengambil data perpus:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal mengambil data perpus.");
  }
},[]); 

  // Login function
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

  // Register function
  const register = async (username, email, password, kode, role, gender, sekolah, kelas) => {
    try {
      await axios.post('/register', { username, email, password, kode, role, gender, sekolah, kelas });
      router.push('/');
    } catch (e) {
      console.error("Registrasi gagal:", e);
      throw new Error(e.response?.data?.message || "Registrasi gagal.");
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post('/logout', null, {
        headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` },
      });
    } catch (e) {
      console.error("Logout gagal:", e);
    } finally {
      localStorage.removeItem('auth_token');
      setUser(null);
      router.push('/');
      router.replace('/');
    }
  };

  // Change password function
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

  // Delete user function
  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

      const response = await axios.delete(`/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (e) {
      console.error("Gagal menghapus user:", e.response?.data?.message || e.message);
      throw new Error(e.response?.data?.message || "Gagal menghapus user.");
    }
  };

  // Delete siswa function
  const deleteSiswa = async (id) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

      const response = await axios.delete(`/siswa/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (e) {
      console.error("Gagal menghapus siswa:", e.response?.data?.message || e.message);
      throw new Error(e.response?.data?.message || "Gagal menghapus siswa.");
    }
  };

  // Delete guru function
  const deleteGuru = async (id) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

      const response = await axios.delete(`/guru/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (e) {
      console.error("Gagal menghapus guru:", e.response?.data?.message || e.message);
      throw new Error(e.response?.data?.message || "Gagal menghapus guru.");
    }
  };

  // Delete perpus function
  const deletePerpus = async (id) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

      const response = await axios.delete(`/perpus/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (e) {
      console.error("Gagal menghapus perpus:", e.response?.data?.message || e.message);
      throw new Error(e.response?.data?.message || "Gagal menghapus perpus.");
    }
  };

  // Update user function
  const updateUser = async (id, form) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

      const res = await axios.post(`/update/${id}`, form, {
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

  // Update siswa function
  const updateSiswa = async (id, form) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

      const res = await axios.post(`/update-siswa/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Perbarui state siswaDetail dengan data yang baru
      setSiswaDetail(res.data.siswa);

      return res.data;
    } catch (e) {
      console.error("Gagal memperbarui siswa:", e.response?.data?.message || e.message);
      throw new Error(e.response?.data?.message || "Gagal memperbarui siswa.");
    }
  };

  // Update guru function
  const updateGuru = async (id, form) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

      const res = await axios.post(`/update-guru/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Jika guru yang diperbarui adalah guru yang sedang login, perbarui state guru
      setGuruDetail(res.data.guru);

      return res.data;
    } catch (e) {
      console.error("Gagal memperbarui guru:", e.response?.data?.message || e.message);
      throw new Error(e.response?.data?.message || "Gagal memperbarui guru.");
    }
  };

  // Update perpus function
  const updatePerpus = async (id, form) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

      const res = await axios.post(`/update-perpus/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Jika perpus yang diperbarui adalah perpus yang sedang login, perbarui state perpus
      setPerpusDetail(res.data.perpus);

      return res.data;
    } catch (e) {
      console.error("Gagal memperbarui perpus:", e.response?.data?.message || e.message);
      throw new Error(e.response?.data?.message || "Gagal memperbarui perpus.");
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      siswaData, 
      guruData, 
      perpusData, 
      siswaDetail, 
      guruDetail, 
      perpusDetail, 
      login, 
      logout, 
      register, 
      changePassword, 
      deleteUser, 
      deleteSiswa,
      deleteGuru,
      deletePerpus,
      updateUser, 
      updateSiswa,
      updateGuru,
      updatePerpus,
      fetchSiswa, 
      fetchGuru, 
      fetchPerpus,
      fetchAllSiswa, 
      fetchAllGuru, 
      fetchAllPerpus 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);