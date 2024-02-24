import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Profile from './Pages/Profile'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import NavBar from './Components/NavBar'
import {Loader} from './Components/loader'
import CreateList from './Pages/CreateList'
import UpdateList from './Pages/UpdateList'
import Listing from './Pages/Listing'
import Search from './Pages/Search'
// import './App.css'

function App() {

  return (
    <>
     <BrowserRouter>
     <NavBar/>
     <Loader/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/listing/:id" element={<Listing/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/create-list" element={<CreateList/>} />
        <Route path="/update-list" element={<UpdateList/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
