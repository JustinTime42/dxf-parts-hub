'use client';
import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/utils/firebase'; 

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="bg-gray-800 flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-gray-800 text-white rounded-lg px-4 py-2 mb-4"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-gray-800 text-white rounded-lg px-4 py-2 mb-4"
      />
      <button
        onClick={handleSignup}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
      >
        Sign Up
      </button>
    </div>
  );
};

export default Signup;