//import { useState } from 'react'
import './App.css'

// hooks
import { useAuth } from './hooks/useAuth.jsx';

// Router
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

// Pages
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import EditProfile from './pages/EditProfile/EditProfile.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Photo from "./pages/Photo/Photo.jsx";

//components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';


function App() {
  const {auth, loading} = useAuth();


  if(loading){
    return <p>Carregando...</p>
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path="/" element={auth ? <Home/> : <Navigate to="/login"/>} />
            <Route path="/profile" element={auth ? <EditProfile/> : <Navigate to="/login"/>} />
            <Route path="/users/:id" element={auth ? <Profile/> : <Navigate to="/login"/>} />
            <Route path="/login" element={!auth ? <Login/> : <Navigate to="/" />} />
            <Route path="/register" element={!auth ? <Register/> : <Navigate to="/" />}/>
            <Route path='/photos/:id' element={auth ? <Photo/> : <Navigate to={"/login"}/>}/>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
