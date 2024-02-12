import React from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import fetchUser from '../fetchingAPI/fetchUser';
import { useSelector } from 'react-redux';

const Profile = () => {
  let location = useLocation();
  let navigate = useNavigate()

 
  fetchUser()

  React.useEffect(() => {
    if(!(localStorage.getItem('token'))){
      navigate('/signin')
    }
  }, [location]);

  const {currentUser} = useSelector(state => state.user)

  return (
    <>
      <div className='text-blue-950 dosis-dosis-500 flex flex-col items-center gap-3 h-screen justify-center'>
        <img className='size-24 rounded-full' src={currentUser.profilepic} />
        <input className='bg-blue-200 rounded w-96 p-2 ' type="text" placeholder='Username' value={currentUser.username} />
        <input className='bg-blue-200 rounded w-96 p-2 ' type="text" placeholder='Email' value={currentUser.email} />
        <input className='bg-blue-200 rounded w-96 p-2 ' type="text" placeholder='Password' />
        {/* <button className='bg-blue-200 rounded w-96 p-2 ' > <button/> */}
        <button className='dosis-dosis-700 bg-blue-950 text-blue-200 active:bg-blue-950 active:text-blue-200 hover:text-blue-950 hover:bg-blue-200 rounded w-96 p-2 '>UPDATE</button>
        <div className='flex justify-between w-96 px-1 text-red-600'>
          <span className='cursor-pointer'>Delete Account</span>
          <span className='cursor-pointer'>Sign Out</span>
        </div>
      </div>
    </>
  )
}

export default Profile
