import { useState } from 'react'
import Goolge from './auth/Goolge'
import useAuthStore from './zustand/authenticatedUser';
import CreateBlog from './pages/createBlog';
import ListingPage from './pages/ListingPage';
import { Route, Routes } from 'react-router-dom';
import Registration from './pages/Registration';
import BlogById from './pages/BlogById';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';


function App() {
  const user = useAuthStore((state) => state.user);
 return (
    <>
   <Navbar/>
   <Routes>
          <>
          <Route path='/'  element={<LandingPage/>}/>
          <Route path='/register' element={<Registration/>} />
            <Route path='/createblog' element={<CreateBlog />} />
            <Route path='/blogs/:id' element={<BlogById />} />
            <Route path='/blogs' element={<ListingPage />} />
          </>
          </Routes>
     
    
  
   
    </>
  )
}

export default App
   