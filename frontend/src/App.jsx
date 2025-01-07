//import { useState } from 'react'
import './App.css'

// Router
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

// Pages
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";

//components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
          </Routes>
          <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
