import { create } from "zustand";



const useBlogs=create((set)=>({
    blogs:[],
    setBlogs:(newBlogs)=>set((state)=>({blogs:newBlogs}))
}));


export default useBlogs;             