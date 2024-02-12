import React from 'react'
import { useSelector } from 'react-redux';
import {Link, useLocation} from 'react-router-dom'

const NavBar = () => {

  let location = useLocation();

  React.useEffect(() => {
    // Google Analytics
    console.log(location)
  }, [location]);

  const {currentUser} = useSelector(state => state.user)
  console.log(currentUser);

  const handleClick = () =>{
    localStorage.clear()
  }

 
  return (
    <div className='fixed z-10 w-screen h-12 res:h-16 bg-blue-950 flex justify-between items-center px-5 res:px-9'>

      {/* logo */}
      <Link to="/">
      <div className='cinzel-decorative-black text-lg res:text-3xl flex'>
        <p className='text-yellow-300'>VISHNU</p>
        <p className='text-orange-400'>DANA</p>
      </div>
      </Link>

      {/* search */}
      <div className='h-8 res:h-10 w-60 lg:w-96 flex p-5  items-center bg-blue-200 rounded-md'>
      <i className="fa-solid fa-magnifying-glass mr-2 mt-1" ></i>

        <input className='bg-blue-200 text-blue-950 placeholder:text-blue-950 placeholder:italic text-justify focus:outline-none' 

         placeholder='search...' type='text'/>
      </div>

      {/* links + profile */}
      <div className='flex items-center'>

      {/* page links */}
      <div className='hidden text-blue-200 res:inline mr-5 dosis-dosis-600 text-lg'>
      <Link className='mr-3 hover:underline underline-offset-8' to = "/">Home</Link>
      <Link onClick={handleClick} className='mr-3 hover:underline underline-offset-8' to = "/signin">{location.pathname===('/signin'||'/signup')?'Sign In':'Sign Out'}</Link>
      <Link className='mr-3 hover:underline underline-offset-8' to = "/about">About</Link>
      </div>

      {/* profile */}
    <Link to="/profile">
    <div id='profile' className ={location.pathname===('/signin'||'/signup')?'hidden':''}>
      {/* <i className="fa-regular fa-circle fa-2xl"> */}
        <img className='size-8 rounded-full' src={currentUser.profilepic} alt="profile" />
      {/* </i> */}
      </div>
      </Link>



      </div>
      
    </div>
  )
}

export default NavBar