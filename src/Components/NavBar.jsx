import React from 'react'
import {Link} from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='w-full h-12 md:h-16 bg-blue-500 flex justify-between items-center px-5 md:px-9'>

      {/* logo */}
      <Link to="/">
      <div className='cinzel-decorative-black text-lg md:text-3xl flex'>
        <p className='text-yellow-300'>VISHNU</p>
        <p className='text-orange-400'>DANA</p>
      </div>
      </Link>

      {/* search */}
      <div className='h-10 w-60 flex justify-center items-center bg-blue-400 rounded-md'>
      <i className="fa-solid fa-magnifying-glass mr-2 mt-1" style={{color: "#fbcfe8"}}></i>
        <input className='bg-blue-400 text-pink-200 placeholder:text-pink-200 placeholder:italic text-justify focus:bg-blue-400 focus:border-none focus:ring-blue-200 focus:outline-none' placeholder='search...' type='text'/>
      </div>

      <div className='flex items-center'>

      <div className='hidden md:inline mr-5'>
      <Link className='mr-3 hover:underline underline-offset-8' to = "/">Home</Link>
      <Link className='mr-3 hover:underline underline-offset-8' to = "/signin">Sign In</Link>
      <Link className='mr-3 hover:underline underline-offset-8' to = "/about">About</Link>
      </div>

      {/* profile */}
      
      <i className="fa-regular fa-circle fa-2xl"></i>
      </div>
      
    </div>
  )
}

export default NavBar