// src/CreateBlog.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const CreateBlog = () => {
  const moviesCollectionRef = collection(db, "blogs");
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data,"datumm")
     const response= await addDoc(moviesCollectionRef, data);
     console.log(response,"ress")
      alert('Blog post created successfully!');
      reset(); 
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Error creating blog post. Please try again.'); 
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create a New Blog Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">Title</label>
          <input
            id="title"
            type="text"
            {...register('title', { required: 'Title is required' })}
            className={`w-full p-2 border border-gray-300 rounded ${errors.title ? 'border-red-500' : ''}`}
          />
          {errors.title && <span className="text-red-500">{errors.title.message}</span>}
        </div>

        <div>
          <label htmlFor="content" className="block mb-1">Content</label>
          <textarea
            id="content"
            {...register('content', { required: 'Content is required' })}
            className={`w-full p-2 border border-gray-300 rounded ${errors.content ? 'border-red-500' : ''}`}
            rows="5"
          />
          {errors.content && <span className="text-red-500">{errors.content.message}</span>}
        </div>

        <div>
          <label htmlFor="author" className="block mb-1">Author</label>
          <input
            id="author"
            type="text"
            {...register('author', { required: 'Author name is required' })}
            className={`w-full p-2 border border-gray-300 rounded ${errors.author ? 'border-red-500' : ''}`}
          />
          {errors.author && <span className="text-red-500">{errors.author.message}</span>}
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Create Blog Post
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
