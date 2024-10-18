import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
const ListingPage = () => {
  const [blogs, setBlogs] = useState([]);
  const collectionRef = collection(db, "blogs");
  const navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDocs(collectionRef);
        const blogsData = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBlogs(blogsData); 
      } catch (error) {
        console.log(error, 'Error fetching blogs');
      }
    };
   
    fetchData();
  }, []);

  return (
    <>   
 <div className="min-h-screen bg-gradient-to-br from-red-100 to-pink-200 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-12">
        Our Latest Blogs
      </h1>

      {!blogs || blogs.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No blogs available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => navigate && typeof navigate === 'function' ? navigate(`/blogs/${blog.id}`) : null}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3 line-clamp-2">{blog.title}</h2>
                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <User size={16} className="mr-2" />
                  <span>{blog.author}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center text-gray-500">
                    <Calendar size={16} className="mr-2" />
                    <span>{blog.publishedDate ? new Date(blog.publishedDate).toLocaleDateString() : 'Date unavailable'}</span>
                  </div>
                  <div className="flex items-center text-blue-600 font-medium hover:text-blue-800">
                    Read More
                    <ChevronRight size={16} className="ml-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  </>
  );
};

export default ListingPage;
