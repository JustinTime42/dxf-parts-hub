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
    <>
      <div className="flex flex-row justify-around">
        <ShapeSelector />
        <div className="rounded border border-white p-4 m-3 flex-shrink-0 w-1/3 text-center">
          <p>Please pardon our dust as we continuously improve (and sometimes break) this application.</p>
          <p>Meanwhile, enjoy free access to all our features during this limited-time early access beta.</p>
          <p>We are eager for any and all feedback you have on your experience. We'd love to hear from you at justin@routeworks.app</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;