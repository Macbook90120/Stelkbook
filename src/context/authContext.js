// authContext.js
'use client'
import { createContext, useState, useEffect, useContext } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/user');
        setUser(res.data);
      } catch (error) {
        return error
      }
    };
    fetchUser();
    console.log(user);
  }, []);

  const login = async (form) => {
    try {
      const res = await axios.post('/login', form);
      localStorage.setItem('auth_token', res.data.token);
      setUser(res.data.user);

      router.push("/dashboard");
    } catch (e) {
      console.error(e);
    }
  };

  const register = async (name, email, password,kode,role,gender,sekolah) => {
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
      console.error(e);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/logout');
      localStorage.removeItem('auth_token');
      setUser(null);
      router.push('/login');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth= () => useContext(AuthContext);