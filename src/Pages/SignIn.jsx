import React, { useState } from 'react'
import Gauth from '../Components/Gauth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../fetchingAPI/fetchUser'
import { signInSuccess, statusChange } from '../redux/reducer/userSlice'


const SignIn = () => {
  const [credential , setcredential] = useState({email:"" , password:""})
  const [fetchdata,setfetchdata] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // console.log(fetchdata);
  const handleClick = async (e) => {
    e.preventDefault()

    document.getElementById('loader').classList.remove('hidden')

    const response = await fetch('http://localhost:3000/api/auth/signin' , {
      method:'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({email:credential.email,password:credential.password})
    })

    const json = await response.json()

    document.getElementById('loader').classList.add('hidden')

    // console.log(json);

    if(json.error){

      document.getElementById('error1').classList.remove('hidden')
      document.getElementById('error').innerHTML = `${json.error}`
    }else{
      localStorage.setItem('token',json.authToken)
      let p = await fetchUser()
      dispatch(signInSuccess(p))
      dispatch(statusChange(true))
      navigate('/')
    }

  }
  const onchange = (e) => {
    setcredential({...credential,[e.target.id]:e.target.value})
  }
  return (
    <>
      <div className=' p-5 dosis-dosis-500 flex flex-col items-center' >

        <div className='mt-[5rem] text-blue-950 text-center text-7xl dosis-dosis-800 my-10 cursor-default'>Sign In</div>

        <form onSubmit={handleClick} className='flex flex-col'>

          <input 
          required pattern=".+@gmail.com" onChange={onchange} 
          className='bg-blue-200 border-2 text-blue-950 mb-4 focus:border-blue-950 rounded focus:outline-none pl-5 p-3 w-96' 
          type="email" name="email" id="email" placeholder='Email' />

          <input 
          required minLength="5" onChange={onchange} 
          className='bg-blue-200 border-2 text-blue-950 mb-4 focus:border-blue-950 rounded focus:outline-none pl-5 p-3 w-96' 
          type="password" name="password" id="password" placeholder='Password' />

          <button type='submit' 
          className='bg-blue-950 border-2 active:bg-blue-950 active:text-blue-200 hover:bg-blue-200 hover:text-blue-950 
          hover:border-blue-950 text-blue-200 mb-4 rounded focus:outline-none pl-5 p-3 w-96' >
            SIGN IN
            </button>

          <Gauth/>

        </form >

        <div id='error1' className=' hidden bg-red-300 text-black flex items-center gap-2 mb-2 w-96 justify-center h-10 rounded'>

          <i className="fa-solid fa-triangle-exclamation" style={{ color: "#000000" }}></i>

          <div id='error'></div>

        </div>

        <div className='flex gap-2'>

          <p className='cursor-default'>Create an account</p> <a className='text-blue-600 hover:underline ' href="/signup">Click here</a>

        </div>

      </div>
    </>
  )
}

export default SignIn
