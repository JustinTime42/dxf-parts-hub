'use client';
import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/utils/firebase'; 
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

const Signin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const router = useRouter();

  const handleSignin = async () => {
    try {
      await signInWithEmailAndPassword(email, password);
      setEmail('');
      setPassword('');
      router.push('/dashboard');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="bg-gray-800 flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>
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
      <Button
        onClick={handleSignin}
        >
        Sign In
        </Button>
    </div>
  );
};

export default Signin;