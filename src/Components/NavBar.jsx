import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { statusChange } from '../redux/reducer/userSlice';

const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let location = useLocation();
  const {loginStatus} = useSelector(state => state.user)
  const [searchTerm,setsearchTerm] = useState('')

  const handleSubmit = (e) =>{
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm', searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  React.useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermReomURL = urlParams.get('searchTerm')
    if(searchTermReomURL) {
      setsearchTerm(searchTermReomURL)
    }
  }, [location.search]);

  const {currentUser} = useSelector(state => state.user)
  // console.log(currentUser);

  const handleClick = () =>{
    dispatch(statusChange(false))
    // console.log(loginStatus);
    localStorage.clear()
  }

  const logo = () => {
    // console.log(loginStatus);
    if(!loginStatus){
      return 'hidden'
    }else{
      return
    }
  }

 
  return (
    <div className='fixed z-10 w-screen h-12 res:h-16 bg-blue-950 flex justify-between items-center px-5 res:px-9'>

      {/* logo */}
      <Link to="/">
      <div className='rubik-head text-lg res:text-4xl flex'>
        <p className='text-yellow-300'>DREAM</p>
        <p className='text-orange-400'>HOME</p>
      </div>
      </Link>

      {/* search */}
      <form onSubmit={handleSubmit} className='h-8 res:h-10 w-60 lg:w-96 flex  items-center bg-blue-200 rounded-md'>

       <input value={searchTerm} onChange={(e)=>{setsearchTerm(e.target.value)}} className='rounded pl-5 h-8 res:h-10 w-60 lg:w-96 bg-blue-200 text-blue-950 placeholder:text-blue-950 placeholder:italic text-justify focus:outline-none' placeholder='Search...' type='text'/>

       <button className='bg-blue-200 h-full rounded w-10'>
        <i className="fa-solid fa-magnifying-glass mr-2 mt-1" ></i>
        </button>

      </form>

      {/* links + profile */}
      <div className='flex items-center'>

      {/* page links */}
      <div className='hidden text-blue-200 res:inline mr-5 dosis-dosis-600 text-lg'>
      <Link className='mr-3 hover:underline underline-offset-8' to = "/">Home</Link>
      <Link onClick={handleClick} className='mr-3 hover:underline underline-offset-8' to = "/signin">{(!loginStatus)?'Sign In':'Sign Out'}</Link>
      <Link className='mr-3 hover:underline underline-offset-8' to = "/about">About</Link>
      </div>

      {/* profile */}

      
    <Link to="/profile">
    <div id='profile' className ={logo()}>
        <img className='size-8 rounded-full' src={(currentUser)?currentUser.profilepic:""} alt="profile" />
      </div>
      </Link>



      </div>
      
    </div>
  )
}

export default NavBar