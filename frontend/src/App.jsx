import { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from './component/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Feed from './pages/Feed';
import Comment from './pages/Comment';
import { Toaster } from 'react-hot-toast';
import { userstore } from './Statemanage/userStore';
function App() {
 const {user,checkAuth,allpost}=userstore();
 useEffect(() => {
    checkAuth()
 }, [checkAuth])
 useEffect(() => {
   allpost();
 }, [])

  return (
    <>
    <Navbar />
    <Toaster/>
     <Routes>
      <Route path='/' element={<Homepage/>} />
        <Route path='/signup' element={<Signup/>} />
         <Route path='/login' element={<Login/>} />
         <Route path='/feed' element={<Feed/>} />
         <Route path='/comment/:id' element={<Comment/>} />
     </Routes>
    </>
  )
}

export default App
