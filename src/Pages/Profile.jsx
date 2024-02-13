import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import fetchUser from '../fetchingAPI/fetchUser';
import { useSelector } from 'react-redux';
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

const Profile = () => {
  const fileRef = useRef(null)
  let location = useLocation();
  let navigate = useNavigate()
  const [file, setfile] = useState(undefined)
  const [fileper, setfileper] = useState(0)
  const [fileUploadError,setfileUploadError] = useState(false)
  const [formData, setformData] = useState({})
  console.log(formData);
  console.log(fileper);
  console.log(fileUploadError);
  
console.log("hiii")

  // fetchUser();

  React.useEffect(() => {
    if (!(localStorage.getItem('token'))) {
      navigate('/signin')
    }
  }, [location]);

  const { currentUser } = useSelector(state => state.user)

  

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
        console.log('Upload is ' + progress + '% done')
        setfileper(Math.round(progress))
      },
      (error) => {
        setfileUploadError(true);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then
        ((downloadURL) => {
          setformData({...formData, avatar: downloadURL});;
        });
      });
    };


    // console.log(file)//9366213949 

    // const handleClick = 
    // const onchange = 

    const handleSubmit = () => {

    }

    return (
      <>
        <form className='text-blue-950 dosis-dosis-500 flex flex-col items-center gap-3 h-screen justify-center'>
          {/* <form onSubmit={handleSubmit}> */}
          <input onChange={(e) => {setfile(e.target.files[0])}} ref={fileRef} type="file" accept='image/*' hidden />/
          <img onClick={() => {fileRef.current.click()}} className='cursor-pointer size-24 rounded-full' src={formData.avatar || currentUser.profilepic} />
          <p>
            {fileUploadError ? (<span>Error image uploded</span>) :
            fileper > 0 && fileper < 100 ? (<span>{`Uploading ${fileper}%`}</span>) :
            fileper === 100 ? (<span>Image successfully uploaded</span>):""}
          </p>
          {/* <input className='bg-blue-200 rounded w-96 p-2 ' type="text" placeholder='Username' value={currentUser.username} /> */}
          {/* <input className='bg-blue-200 rounded w-96 p-2 ' type="text" placeholder='Email' value={currentUser.email} /> */}
          <input className='bg-blue-200 rounded w-96 p-2 ' type="text" placeholder='Password' />
          {/* <button className='bg-blue-200 rounded w-96 p-2 ' > <button/> */}
          <button className='dosis-dosis-700 bg-blue-950 text-blue-200 active:bg-blue-950 active:text-blue-200 hover:text-blue-950 hover:bg-blue-200 rounded w-96 p-2 '>UPDATE</button>
          <div className='flex justify-between w-96 px-1 text-red-600'>
            <span className='cursor-pointer'>Delete Account</span>
            <span className='cursor-pointer'>Sign Out</span>
          </div>
          {/* </form> */}
        </form>
      </>
    )
  }

  export default Profile
