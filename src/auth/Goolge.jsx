import React from 'react'
import {auth,googleProvider}  from '../config/firebase'
import {signInWithPopup,signOut}  from 'firebase/auth';
import useAuthStore from '../zustand/authenticatedUser.js';

const Goolge = () => {
const setUser = useAuthStore((state) => state.setUser);


    const signInWithGoogle=async()=>{
        try {
        const user=await signInWithPopup(auth,googleProvider)
        console.log(user,"userrr") 
        setUser(user)
    
        } catch (error) {
            console.log(error,"err")
        }
    }

    const logout=async()=>{
        try {
           await signOut(auth,googleProvider) 
        } catch (error) {
            console.log(error,"err")
        }
    }
  return (
    <div>
    <button className='bg-red-500'   onClick={signInWithGoogle}>Sign in with google</button>
    <button onClick={logout}>Logout</button>
</div>
  )
}

export default Goolge