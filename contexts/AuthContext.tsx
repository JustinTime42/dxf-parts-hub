// 'use client';
// import React, { createContext, useState, useEffect, ReactNode } from 'react';
// import { auth } from '@/utils/firebase';
// import 'firebase/auth';
// import { useAuthState } from 'react-firebase-hooks/auth';


// interface AuthContextValue {
//   currentUser: auth.User | null;
//   // Add any other relevant data or methods
// }

// type AuthProviderProps = {
//     children: React.ReactNode;
//   };

// export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, loading, error] = useAuthState(auth);

//   const value: AuthContextValue = {
//     currentUser,
//     // Add any other relevant data or methods
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };
