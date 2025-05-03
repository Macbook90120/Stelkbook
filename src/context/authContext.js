'use client';
import { createContext, useState, useEffect, useContext,useCallback } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [siswaData, setSiswaData] = useState(null);
  const [siswaSdData, setSiswaSdData] = useState(null); // Data semua siswa SD
const [siswaSmpData, setSiswaSmpData] = useState(null); // Data semua siswa SMP
const [siswaSmkData, setSiswaSmkData] = useState(null); // Data semua siswa SMK
const [siswaSdDetail, setSiswaSdDetail] = useState(null); // Data spesifik siswa SD berdasarkan ID
const [siswaSmpDetail, setSiswaSmpDetail] = useState(null); // Data spesifik siswa SMP berdasarkan ID
const [siswaSmkDetail, setSiswaSmkDetail] = useState(null); // Data spesifik siswa SMK berdasarkan ID
  const [guruData, setGuruData] = useState(null);
  const [guruSdData, setGuruSdData] = useState(null); // Data semua guru SD
const [guruSmpData, setGuruSmpData] = useState(null); // Data semua guru SMP
const [guruSmkData, setGuruSmkData] = useState(null); // Data semua guru SMK
  const [perpusData, setPerpusData] = useState(null);
  const [siswaDetail, setSiswaDetail] = useState(null); // State untuk data siswa spesifik
  const [guruDetail, setGuruDetail] = useState(null); // State untuk data guru spesifik
  const [guruSdDetail, setGuruSdDetail] = useState(null); // Data spesifik guru SD berdasarkan ID
const [guruSmpDetail, setGuruSmpDetail] = useState(null); // Data spesifik guru SMP berdasarkan ID
const [guruSmkDetail, setGuruSmkDetail] = useState(null); // Data spesifik guru SMK berdasarkan ID
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

const fetchSiswaSd = useCallback(async (id) => {
  if (!id) throw new Error("ID siswa harus diberikan.");

  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");
    const res = await axios.get(`/siswa-sd/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSiswaSdDetail(res.data);
  } catch (e) {
    console.error("Gagal mengambil data siswa SD:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal mengambil data siswa SD.");
  }
}, []);

const fetchSiswaSmp = useCallback(async (id) => {
  if (!id) throw new Error("ID siswa harus diberikan.");

  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");
    const res = await axios.get(`/siswa-smp/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSiswaSmpDetail(res.data);
  } catch (e) {
    console.error("Gagal mengambil data siswa SMP:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal mengambil data siswa SMP.");
  }
}, []);

const fetchSiswaSmk = useCallback(async (id) => {
  if (!id) throw new Error("ID siswa harus diberikan.");

  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");
    const res = await axios.get(`/siswa-smk/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSiswaSmkDetail(res.data);
  } catch (e) {
    console.error("Gagal mengambil data siswa SMK:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal mengambil data siswa SMK.");
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

const fetchGuruSd = useCallback(async (id) => {
  if (!id) throw new Error("ID guru SD harus diberikan.");

  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

    const res = await axios.get(`/guru-sd/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setGuruSdDetail(res.data);
  } catch (e) {
    console.error("Gagal mengambil data guru SD:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal mengambil data guru SD.");
  }
}, []);

// Fetch guru SMP data by ID
const fetchGuruSmp = useCallback(async (id) => {
  if (!id) throw new Error("ID guru SMP harus diberikan.");

  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

    const res = await axios.get(`/guru-smp/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setGuruSmpDetail(res.data);
  } catch (e) {
    console.error("Gagal mengambil data guru SMP:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal mengambil data guru SMP.");
  }
}, []);

// Fetch guru SMK data by ID
const fetchGuruSmk = useCallback(async (id) => {
  if (!id) throw new Error("ID guru SMK harus diberikan.");

  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

    const res = await axios.get(`/guru-smk/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setGuruSmkDetail(res.data);
  } catch (e) {
    console.error("Gagal mengambil data guru SMK:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal mengambil data guru SMK.");
  }
}, []);

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

const fetchAllSiswaSd = useCallback(async () => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");
    const res = await axios.get('/siswa-sd', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSiswaSdData(res.data);
  } catch (e) {
    console.error("Gagal mengambil data siswa SD:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal mengambil data siswa SD.");
  }
}, []);

const fetchAllSiswaSmp = useCallback(async () => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");
    const res = await axios.get('/siswa-smp', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSiswaSmpData(res.data);
  } catch (e) {
    console.error("Gagal mengambil data siswa SMP:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal mengambil data siswa SMP.");
  }
}, []);

const fetchAllSiswaSmk = useCallback(async () => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");
    const res = await axios.get('/siswa-smk', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSiswaSmkData(res.data);
  } catch (e) {
    console.error("Gagal mengambil data siswa SMK:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal mengambil data siswa SMK.");
  }
}, []);

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

const fetchAllGuruSd = useCallback(async () => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

    const res = await axios.get('/guru-sd', {
      headers: { Authorization: `Bearer ${token}` },
    });

    setGuruSdData(res.data);
  } catch (e) {
    console.error("Gagal mengambil data guru SD:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal mengambil data guru SD.");
  }
}, []);

// Fetch all guru SMP data
const fetchAllGuruSmp = useCallback(async () => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

    const res = await axios.get('/guru-smp', {
      headers: { Authorization: `Bearer ${token}` },
    });

    setGuruSmpData(res.data);
  } catch (e) {
    console.error("Gagal mengambil data guru SMP:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal mengambil data guru SMP.");
  }
}, []);

// Fetch all guru SMK data
const fetchAllGuruSmk = useCallback(async () => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

    const res = await axios.get('/guru-smk', {
      headers: { Authorization: `Bearer ${token}` },
    });

    setGuruSmkData(res.data);
  } catch (e) {
    console.error("Gagal mengambil data guru SMK:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal mengambil data guru SMK.");
  }
}, []);

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
const register = async (username, email, password, kode, role, gender, sekolah, kelas, avatarFile) => {
  try {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('kode', kode);
    formData.append('role', role);
    formData.append('gender', gender);
    formData.append('sekolah', sekolah);
    formData.append('kelas', kelas);

    if (avatarFile) {
      formData.append('avatar', avatarFile); // <-- penting
    }

    const response = await axios.post('/register', formData,  {
      method: 'POST',
      body: formData,
      // headers akan otomatis diset ke multipart/form-data
    });

    return response.data;
  } catch (error) {
    throw error.response?.data?.errors || error;
  }
};

// Register2 function (for pending approval)
const register2 = async (username, email, password, kode, role, gender, sekolah, kelas, avatarFile) => {
  try {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('kode', kode);
    formData.append('role', role);
    formData.append('gender', gender);
    
    if (['Siswa', 'Guru'].includes(role)) {
      formData.append('sekolah', sekolah);
    }
    
    if (role === 'Siswa') {
      formData.append('kelas', kelas);
    }

    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    const response = await axios.post('/register2', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    throw error.response?.data?.errors || error;
  }
};

// Add functions to fetch pending users and handle approval/rejection
const fetchPendingUsers = useCallback(async () => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

    const res = await axios.get('/users-pending', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (e) {
    console.error("Gagal mengambil data pengguna pending:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal mengambil data pengguna pending.");
  }
}, []);

const approveUser = useCallback(async (id) => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

    const res = await axios.post(`/approve-user/${id}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (e) {
    console.error("Gagal menyetujui pengguna:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal menyetujui pengguna.");
  }
}, []);

const rejectUser = useCallback(async (id) => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

    const res = await axios.delete(`/reject-user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (e) {
    console.error("Gagal menolak pengguna:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal menolak pengguna.");
  }
}, []);


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

  const deleteSiswaSd = async (id) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");
      const res = await axios.delete(`/siswa-sd/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (e) {
      console.error("Gagal menghapus siswa SD:", e.response?.data?.message || e.message);
      throw new Error(e.response?.data?.message || "Gagal menghapus siswa SD.");
    }
  };
  
  const deleteSiswaSmp = async (id) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");
      const res = await axios.delete(`/siswa-smp/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (e) {
      console.error("Gagal menghapus siswa SMP:", e.response?.data?.message || e.message);
      throw new Error(e.response?.data?.message || "Gagal menghapus siswa SMP.");
    }
  };
  
  const deleteSiswaSmk = async (id) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");
      const res = await axios.delete(`/siswa-smk/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (e) {
      console.error("Gagal menghapus siswa SMK:", e.response?.data?.message || e.message);
      throw new Error(e.response?.data?.message || "Gagal menghapus siswa SMK.");
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

  // Delete guru SD function
const deleteGuruSd = async (id) => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

    const response = await axios.delete(`/guru-sd/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (e) {
    console.error("Gagal menghapus guru SD:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal menghapus guru SD.");
  }
};

// Delete guru SMP function
const deleteGuruSmp = async (id) => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

    const response = await axios.delete(`/guru-smp/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (e) {
    console.error("Gagal menghapus guru SMP:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal menghapus guru SMP.");
  }
};

// Delete guru SMK function
const deleteGuruSmk = async (id) => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

    const response = await axios.delete(`/guru-smk/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (e) {
    console.error("Gagal menghapus guru SMK:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal menghapus guru SMK.");
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

  const updateSiswaSd = async (id, form) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");
      const res = await axios.post(`/update-siswa-sd/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSiswaSdDetail(res.data);
      return res.data;
    } catch (e) {
      console.error("Gagal memperbarui siswa SD:", e.response?.data?.message || e.message);
      throw new Error(e.response?.data?.message || "Gagal memperbarui siswa SD.");
    }
  };
  
  const updateSiswaSmp = async (id, form) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");
      const res = await axios.post(`/update-siswa-smp/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSiswaSmpDetail(res.data);
      return res.data;
    } catch (e) {
      console.error("Gagal memperbarui siswa SMP:", e.response?.data?.message || e.message);
      throw new Error(e.response?.data?.message || "Gagal memperbarui siswa SMP.");
    }
  };
  
  const updateSiswaSmk = async (id, form) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");
      const res = await axios.post(`/update-siswa-smk/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSiswaSmkDetail(res.data);
      return res.data;
    } catch (e) {
      console.error("Gagal memperbarui siswa SMK:", e.response?.data?.message || e.message);
      throw new Error(e.response?.data?.message || "Gagal memperbarui siswa SMK.");
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

  // Update guru SD function
const updateGuruSd = async (id, form) => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

    const res = await axios.post(`/update-guru-sd/${id}`, form, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setGuruSdDetail(res.data);
    return res.data;
  } catch (e) {
    console.error("Gagal memperbarui guru SD:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal memperbarui guru SD.");
  }
};

// Update guru SMP function
const updateGuruSmp = async (id, form) => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

    const res = await axios.post(`/update-guru-smp/${id}`, form, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setGuruSmpDetail(res.data);
    return res.data;
  } catch (e) {
    console.error("Gagal memperbarui guru SMP:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal memperbarui guru SMP.");
  }
};

// Update guru SMK function
const updateGuruSmk = async (id, form) => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error("Token tidak ditemukan, silakan login kembali.");

    const res = await axios.post(`/update-guru-smk/${id}`, form, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setGuruSmkDetail(res.data);
    return res.data;
  } catch (e) {
    console.error("Gagal memperbarui guru SMK:", e.response?.data?.message || e.message);
    throw new Error(e.response?.data?.message || "Gagal memperbarui guru SMK.");
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
      siswaSdData,
      siswaSmpData,
      siswaSmkData, 
      guruData,
      guruSdData,
      guruSmpData,
      guruSmkData, 
      perpusData, 
      siswaDetail, 
      siswaSdDetail,
      siswaSmpDetail,
      siswaSmkDetail,
      guruDetail, 
      guruSdDetail,
      guruSmpDetail,
      guruSmkDetail,
      perpusDetail, 
      login, 
      logout, 
      register,
      register2, 
      changePassword, 
      deleteUser, 
      deleteSiswa,
      deleteSiswaSd,
      deleteSiswaSmp,
      deleteSiswaSmk,
      deleteGuru,
      deleteGuruSd,
      deleteGuruSmp,
      deleteGuruSmk,
      deletePerpus,
      updateUser, 
      updateSiswa,
      updateSiswaSd,
      updateSiswaSmp,
      updateSiswaSmk,
      updateGuru,
      updateGuruSd,
      updateGuruSmp,
      updateGuruSmk,
      updatePerpus,
      fetchSiswa, 
      fetchSiswaSd,
      fetchSiswaSmp,
      fetchSiswaSmk,
      fetchGuru, 
      fetchGuruSd,
      fetchGuruSmp,
      fetchGuruSmk,
      fetchPerpus,
      fetchPendingUsers,
      approveUser,
      rejectUser,
      fetchAllSiswa, 
      fetchAllGuru, 
      fetchAllPerpus,
      fetchAllSiswaSd,
      fetchAllSiswaSmp,
      fetchAllSiswaSmk,
      fetchAllGuruSd,
      fetchAllGuruSmp,
      fetchAllGuruSmk,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);