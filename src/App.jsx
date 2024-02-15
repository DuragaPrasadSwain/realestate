import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Profile from './Pages/Profile'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import NavBar from './Components/NavBar'
import Loader from './Components/loader'
import CreateList from './Pages/CreateList'
// import './App.css'

function App() {

  return (
    <>
     <BrowserRouter>
     <NavBar/>
     <Loader/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/create-list" element={<CreateList/>} />
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
