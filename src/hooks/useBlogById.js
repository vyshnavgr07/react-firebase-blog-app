import React, { useState } from 'react'
import {doc,getDoc}  from 'firebase/firestore';
import { db } from '../config/firebase';
const useBlogById = () => {
    const [loading,setLoading]=useState(false);
     const [blog,setBlog]=useState(null);
    const blogsBY=async(id)=>{
        setLoading(true)
        try {
            const docRef=doc(db,'blogs',id);
            const docSnap=await getDoc(docRef);
             if (docSnap.exists()) {
                setBlog({ id: docSnap.id, ...docSnap.data() })
              } else {
                 throw new Error('error')
              }
        } catch (error) {
            console.log(error,'err')
        }finally{
            setLoading(false)
        }
    }
return {loading,blogsBY,blog}
}

export default useBlogById