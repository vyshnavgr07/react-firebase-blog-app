import React, { useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import useBlogs from "../zustand/blogs";
const useBlogListing = () => {
  const [loading, setLoading] = useState(false);
  const {blogs,setBlogs} =useBlogs()
  const blogListing = async () => {
    setLoading(true);
    try {
      try {
        const collectionRef = collection(db, "blogs");
        const response = await getDocs(collectionRef);
        const blogsData = response.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBlogs(blogsData)
      } catch (error) {
        console.log(error, "Error fetching blogs");
      }
    } catch (error) {
      console.log(error, "err");
    } finally {
      setLoading(false);
    }
};

  
  return { loading, blogListing };
};

export default useBlogListing;
