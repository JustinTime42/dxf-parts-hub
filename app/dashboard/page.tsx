'use client';
import React from 'react';
import ShapeSelector from './ShapeSelector';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/utils/firebase';

const Dashboard: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  if (loading) return null;
  if (!user) {
    router.push('/signin');
  }
  return (
    <ShapeSelector />
  );
};

export default Dashboard;