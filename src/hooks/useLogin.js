import { signInWithEmailAndPassword } from "firebase/auth";
import useAuthStore from "../zustand/authenticatedUser";
import { useState } from "react";
const useLogin =() => {
const [loading,setLoading]=useState(false);
const setUser=useAuthStore((state)=>state.setUser)
 const login=async(auth,email,password)=>{
    setLoading(true)
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
         if (user.emailVerified) {
          console.log("User is logged in and email is verified!");
          localStorage.setItem('user',JSON.stringify(user))
          setUser(user)
        } else {
          console.log("Please verify your email before logging in.");
        }
    } catch (error) {
        console.log(error,'errr')
    }finally{
setLoading(false)
    }
}

return {loading,login}
}

export default useLogin