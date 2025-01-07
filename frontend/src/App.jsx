//import { useState } from 'react'
import './App.css'

// Router
import {BrowserRouter, Routes, Router, Navigate} from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Router path="/" element={}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
