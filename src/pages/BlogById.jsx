import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom';
import useBlogById from '../hooks/useBlogById';
import LoadingSpinner from '../components/loader/LoadingSpinner';
const BlogById = () => {
    const {id} =useParams();
   const {loading,blogsBY,blog}=useBlogById()

useEffect(()=>{
blogsBY(id);
    },[])


console.log(blog,'blobbbbb')
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
    {loading ? (
        <LoadingSpinner />
    ) : (
        <>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{blog?.title}</h1>
            <p className="text-gray-600 mb-2 text-lg">By: <span className="font-semibold">{blog?.author}</span></p>
            <div className="border-t border-gray-300 mt-4 pt-4">
                <p className="text-lg text-gray-700 leading-relaxed">{blog?.content}</p>
            </div>
        </>
    )}
</div>
  )
}

export default BlogById