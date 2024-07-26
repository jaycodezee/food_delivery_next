"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('userdata');
    if (!userData) {
      router.push('/user');
    }
  }, [router]);
};