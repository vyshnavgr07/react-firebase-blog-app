import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase';
import {getDoc,doc}  from 'firebase/firestore';
import { useParams } from 'react-router-dom';
const BlogById = () => {
    const {id} =useParams();
   const [blog,setBlog]=useState(null)
    const fetchBlog=async()=>{
        try {
            const docRef=doc(db,'blogs',id);

            const docSnap=await getDoc(docRef);
             if (docSnap.exists()) {
                setBlog({ id: docSnap.id, ...docSnap.data() });
              } else {
                setError('No such blog exists!'); 
              }

              console.log(blog,"bloggg")
        } catch (error) {
            console.log(error,'errrr')
        }
    }


useEffect(()=>{
fetchBlog()
    },[])
    console.log(blog,'fnfnnfnf')
  return (
    <div className="max-w-2xl mx-auto p-4">
    <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>
    <p className="text-gray-600 mb-2">By:{blog?.author}</p>
    <div className="border-t border-gray-300 mt-4 pt-4">
      <p className="text-lg">{blog?.content}</p>
    </div>
  </div>
  )
}

export default BlogById