import React from 'react';
import { auth, googleProvider, db } from '../config/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import useAuthStore from '../zustand/authenticatedUser.js';

const Google = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
   console.log('User successfully signed in and data stored:', user.uid);
    } catch (error) {
      console.error('Error during sign in:', error.message);
  
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear the user from global state
      console.log('User successfully logged out');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  return (
    <div className="flex gap-4 items-center justify-center p-4">
      <button 
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>
      <button 
        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Google;