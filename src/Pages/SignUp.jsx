import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Gauth from '../Components/Gauth';

const SignUp = () => {
  const [credential, setcredential] = useState({ username: "", email: "", password: "" })
  const navigate = useNavigate();

  const onchange = (e) => {
    setcredential({ ...credential, [e.target.id]: e.target.value })
  }

  const handleClick = async (e) => {
    e.preventDefault()
    document.getElementById('loader').classList.remove('hidden')
    const response = await fetch('http://localhost:3000/api/auth/signup', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify({ username: credential.username, email: credential.email, password: credential.password })
    })
    const json = await response.json()
    document.getElementById('loader').classList.add('hidden')
    console.log(json)
    document.getElementById('error1').classList.add('hidden')

    if (json.error) {
      document.getElementById('error').innerHTML = `${json.error}`
      document.getElementById('error1').classList.remove('hidden')
    }else{
      localStorage.setItem('token',json.authToken)
      navigate('/')
    }

  }

  return (
    <>
      <div className=' p-5 dosis-dosis-500 flex flex-col items-center' >
        <div className='mt-[5rem] text-blue-950 text-center text-7xl dosis-dosis-800 my-10 cursor-default'>Sign Up</div>
        <form onSubmit={handleClick} className='flex flex-col'>
          <input required onChange={onchange} className='bg-blue-200 border-2 text-blue-950 mb-4 focus:border-blue-950 rounded focus:outline-none pl-5 p-3 w-96' type="text" name="username" id="username" placeholder='Username' />
          <input required pattern=".+@gmail.com" onChange={onchange} className='bg-blue-200 border-2 text-blue-950 mb-4 focus:border-blue-950 rounded focus:outline-none pl-5 p-3 w-96' type="email" name="email" id="email" placeholder='Email' />
          <input required minLength="5" onChange={onchange} className='bg-blue-200 border-2 text-blue-950 mb-4 focus:border-blue-950 rounded focus:outline-none pl-5 p-3 w-96' type="password" name="password" id="password" placeholder='Password' />

          <button type='submit' className='bg-blue-950 border-2 active:bg-blue-950 active:text-blue-200 hover:bg-blue-200 hover:text-blue-950 hover:border-blue-950 text-blue-200 mb-4 rounded focus:outline-none pl-5 p-3 w-96' >SIGN UP</button>
          <Gauth/>
        </form >
        <div id='error1' className=' hidden bg-red-300 text-black flex items-center gap-2 mb-2 w-96 justify-center h-10 rounded'>
          <i className="fa-solid fa-triangle-exclamation" style={{ color: "#000000" }}></i>

          <div id='error' className=''></div>

        </div>

        <div className='flex gap-2'>
          <p className='cursor-default'>Already have an account</p> <a className='text-blue-600 hover:underline ' href="/">Click here</a>
        </div>

      </div>
    </>
  )
}

export default SignUp

// 936621394
