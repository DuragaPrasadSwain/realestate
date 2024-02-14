import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { signInSuccess, updateData } from '../redux/reducer/userSlice';
import { updateUserinofo } from '../fetchingAPI/updateUser';
import { fetchUser } from '../fetchingAPI/fetchUser';
import { deleteUser } from '../fetchingAPI/deleteUser';

const Profile = () => {
  const fileRef = useRef(null)
  let location = useLocation();
  let navigate = useNavigate()
  let dispatch = useDispatch()
  const [file, setfile] = useState(undefined)
  const [fileper, setfileper] = useState(0)
  const [fileUploadError, setfileUploadError] = useState(false)
  const [formData, setformData] = useState({})

  const [updatedata, setupdatedata] = useState({ username: null, email: null, password: null, profilepic: null })

  React.useEffect(() => {
    if (!(localStorage.getItem('token'))) {
      navigate('/signin')
    }
  }, [location]);

  const { currentUser, updateUser } = useSelector(state => state.user)





  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file]);





  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setfileper(Math.round(progress))
      },
      (error) => {
        setfileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
          ((downloadURL) => {
            setupdatedata({ ...updatedata, profilepic: downloadURL })
          });
      });
  };

  const onchange = (e) => {
    setupdatedata({ ...updatedata, [e.target.id]: e.target.value })
  }

  dispatch(updateData(updatedata))

  let useri = null;


  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateUserinofo(currentUser._id, updateUser)
    useri = await fetchUser()
    dispatch(signInSuccess(useri))

  }



  const handleClick = async () => {
    await deleteUser(currentUser._id)
    localStorage.clear()
    navigate('/signin')
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='text-blue-950 dosis-dosis-500 flex flex-col items-center gap-3 h-screen justify-center'>
        <input onChange={(e) => { setfile(e.target.files[0]) }} ref={fileRef} type="file" accept='image/*' hidden />/
        <img onClick={() => { fileRef.current.click() }} className='cursor-pointer size-24 rounded-full' src={formData.avatar || currentUser.profilepic} />
        <p>
          {fileUploadError ? (<span>Error image uploded</span>) :
            fileper > 0 && fileper < 100 ? (<span>{`Uploading ${fileper}%`}</span>) :
              fileper === 100 ? (<span>Image successfully uploaded</span>) : ""}
        </p>
        <input onChange={onchange} className='bg-blue-200 rounded w-96 p-2 ' type="text" id='username' placeholder={currentUser.username} />
        <input onChange={onchange} className='bg-blue-200 rounded w-96 p-2 ' type="text" id='email' placeholder={currentUser.email} />
        <input onChange={onchange} className='bg-blue-200 rounded w-96 p-2 ' type="text" id='password' placeholder='Password' />
        <button className='dosis-dosis-700 bg-blue-950 text-blue-200 active:bg-blue-950 active:text-blue-200 hover:text-blue-950 hover:bg-blue-200 rounded w-96 p-2 '>UPDATE</button>
        <div className='flex justify-between w-96 px-1 text-red-600'>
          <span onClick={handleClick} className='cursor-pointer'>Delete Account</span>
          <span onClick={() => {
            localStorage.clear()
            navigate('/signin')
          }} className='cursor-pointer'>Sign Out</span>
        </div>
      </form>
    </>
  )
}

export default Profile
