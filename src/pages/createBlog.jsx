// src/CreateBlog.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import useAuthStore from '../zustand/authenticatedUser';

const CreateBlog = () => {
  const blogsCollectionRef = collection(db, "blogs");
  const user = useAuthStore((state) => state.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!user) {
      alert("You need to be logged in to create a blog post.");
      return;
    }
    try {
      const newData={...data,
        autherId:user.userId,
        authorName: user.name||"Anonymous", 
        createdAt: new Date()}

      console.log(newData,"datumm")
     const response= await addDoc(blogsCollectionRef,newData);
     console.log(response,"ress")
      alert('Blog post created successfully!');
      reset(); 
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Error creating blog post. Please try again.'); 
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
    <h1 className="text-4xl font-bold text-gray-800 mb-6">Create a New Blog Post</h1>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-lg font-semibold mb-2">Title</label>
        <input
          id="title"
          type="text"
          {...register('title', { required: 'Title is required' })}
          className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-500' : ''}`}
          placeholder="Enter the title of your blog post"
        />
        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
      </div>

      <div>
        <label htmlFor="content" className="block text-lg font-semibold mb-2">Content</label>
        <textarea
          id="content"
          {...register('content', { required: 'Content is required' })}
          className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.content ? 'border-red-500' : ''}`}
          rows="8"
          placeholder="Write your blog content here..."
        />
        {errors.content && <span className="text-red-500 text-sm">{errors.content.message}</span>}
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-500 transition duration-200">
        Create Blog Post
      </button>
    </form>
  </div>
  );
};

export default CreateBlog;
