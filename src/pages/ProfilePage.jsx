import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import useAuthStore from '../zustand/authenticatedUser';

const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);
  const [blog, setBlog] = useState([]);

  const fetchData = async () => {
    try {
      const blogCollectionRef = collection(db, 'blogs');
      const q = query(blogCollectionRef, where('autherId', '==', user.userId));
      const blogsnap = await getDocs(q);
      const blogData = blogsnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // Include document ID

      console.log(blogData, 'bloggggggg');
      setBlog(blogData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'blogs', id));
      setBlog(blog.filter((b) => b.id !== id)); // Remove blog from UI
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function convertTimestamp(seconds, nanoseconds) {
    const milliseconds = seconds * 1000 + nanoseconds / 1000000;
    const date = new Date(milliseconds);
    return date.toLocaleString(); // Converts to a human-readable string
  }

  return (
    <div className="max-w-2x mx-auto p-8 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s"
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md mr-4"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600 mt-1">{user.email}</p>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Blogs Created</h3>
        <ul className="space-y-4">
          {blog.map((blog, i) => (
            <li key={i} className="p-4 border border-gray-200 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl bg-white">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-medium text-blue-600 hover:underline cursor-pointer">{blog.title}</h4>
                  <p className="text-gray-700 mt-2">{blog.content}</p>
                  <p className="text-gray-500 mt-2">{convertTimestamp(blog.createdAt.seconds, blog.createdAt.nanoseconds)}</p>
                </div>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
