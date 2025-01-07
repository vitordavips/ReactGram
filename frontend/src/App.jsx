//import { useState } from 'react'
import './App.css'

// Router
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

// Pages
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
