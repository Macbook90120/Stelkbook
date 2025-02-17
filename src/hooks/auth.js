// hooks/auth.js
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';

export default function useAuthMiddleware(redirectTo = '/login') {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push(redirectTo); // Redirect ke halaman login jika tidak ada user
    }
  }, [user, redirectTo, router]);
}