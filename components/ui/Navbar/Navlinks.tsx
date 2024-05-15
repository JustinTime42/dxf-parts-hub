'use client';

import Link from 'next/link';
import Logo from '@/components/icons/Logo';
import { usePathname, useRouter } from 'next/navigation';
import s from './Navbar.module.css';
// import Signup from '../AuthForms/Signup';
import { useSignOut, useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/utils/firebase';
import Button from '../Button';
import Image from 'next/image';


const Navlinks = () => {
  const [user, authLoading, authError] = useAuthState(auth);
  const [signOut, signOutLoading, signOutError] = useSignOut(auth);
  // const router = getRedirectMethod() === 'client' ? useRouter() : null;

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (authLoading) return null;
  if (authError) return <div>Error: {String(authError)}</div>;
  return (
    <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
      
      <div className="flex items-center flex-1">
        <Link href="/" aria-label="Logo">
          <Image src="/favicon.ico" alt="Logo" width={40} height={40} />
        </Link>
        <h1 className="text-2xl font-bold">DXF Parts Hub</h1>
        {/* <Signup /> */}
        <nav className="ml-6 space-x-2 lg:block">
          {/* <Link href="/" className={s.link}>
            Pricing
          </Link>
          */}
          {user && (
            <Link href="/account" className={s.link}>
              Account
            </Link>
          )}
          {user && (
            <Link href="/dashboard" className={s.link}>
              Dashboard
            </Link>
          )}
        </nav>
      </div>
      <div className="flex justify-end space-x-8">
        {user ? (
          <Button variant='slim' onClick={handleSignOut} className={s.link}>
            Sign Out 
          </Button>
        ) : (
          <>
          <Link href="/signin" className={s.link}>
            Sign In
          </Link>
          <Link href="/signup" className={s.link}>
            Sign Up
          </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navlinks;