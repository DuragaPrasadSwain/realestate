import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { signInSuccess, statusChange, updateData, updateListData } from '../redux/reducer/userSlice';
import { updateUserinofo } from '../fetchingAPI/updateUser';
import { fetchUser } from '../fetchingAPI/fetchUser';
import { deleteUser } from '../fetchingAPI/deleteUser';
// import { getList } from '../fetchingAPI/getlists';

import { deletelist } from '../fetchingAPI/deletelist';
import { getList } from '../fetchingAPI/getLists';

const Profile = () => {
  const fileRef = useRef(null)
  let location = useLocation();
  let navigate = useNavigate()
  let dispatch = useDispatch()
  const [file, setfile] = useState(undefined)
  const [fileper, setfileper] = useState(0)
  const [fileUploadError, setfileUploadError] = useState(false)
  const [formData, setformData] = useState({})
  const [list,setlist] = useState(null)

  const [updatedata, setupdatedata] = useState({ username: null, email: null, password: null, profilepic: null })

  React.useEffect(() => {
    if (!(localStorage.getItem('token'))) {
      navigate('/signin')
    }
  }, [location]);

  const { currentUser, updateUser, updateList} = useSelector(state => state.user)





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
            dispatch(updateData(updatedata))
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
    dispatch(updateData(updatedata))
    document.getElementById('loader').classList.remove('hidden')
    await updateUserinofo(currentUser._id, updateUser)
    useri = await fetchUser()
    document.getElementById('loader').classList.add('hidden')
    dispatch(signInSuccess(useri))

  }



  const handleClick = async () => {
    document.getElementById('loader').classList.remove('hidden')
    await deleteUser(currentUser._id)
    document.getElementById('loader').classList.add('hidden')
    localStorage.clear()
    navigate('/signin')
  }

let i = 0
  // console.log(list.list.i;

  const getListButton = async(e) => {
    e.preventDefault()
    if(!list){
      setlist(await getList())
    }else{
      setlist(null)
    }
  }

  const deleteList = async(id) => {
    await deletelist(id)
    setlist(await getList())
  }

  const updatelist = (index) => {
dispatch(updateListData(index))
console.log(updateList);
navigate('/update-list')
  }

  return (
    <>
    <div className='text-blue-950 dosis-dosis-500 flex flex-col items-center gap-3 h-screen justify-center'>
      <form onSubmit={handleSubmit} className='flex flex-col items-center gap-3' >
        <input onChange={(e) => { setfile(e.target.files[0]) }} ref={fileRef} type="file" accept='image/*' hidden />/
        <img onClick={() => { fileRef.current.click() }} className='cursor-pointer size-24 rounded-full' src={formData.avatar || currentUser.profilepic} />
        <p>
          {fileUploadError ? (<span className='text-red-600' >Error image uploded</span>) :
            fileper > 0 && fileper < 100 ? (<span>{`Uploading ${fileper}%`}</span>) :
              fileper === 100 ? (<span className='text-green-600'>Press update</span>) : ""}
        </p>
        <input onChange={onchange} className='bg-blue-200 rounded w-96 p-2 ' type="text" id='username' placeholder={currentUser.username} />
        <input onChange={onchange} className='bg-blue-200 rounded w-96 p-2 ' type="text" id='email' placeholder={currentUser.email} />
        <input onChange={onchange} className='bg-blue-200 rounded w-96 p-2 ' type="text" id='password' placeholder='Password' />
        <button className='dosis-dosis-700 bg-blue-950 text-blue-200 active:bg-blue-950 active:text-blue-200 hover:text-blue-950 hover:bg-blue-200 rounded w-96 p-2 '>UPDATE</button>
      </form>
      <button onClick={()=>{navigate('/create-list')}} className='dosis-dosis-700 bg-blue-950 text-blue-200 active:bg-blue-950 active:text-blue-200 hover:text-blue-950 hover:bg-blue-200 rounded w-96 p-2 '>CREATE LIST</button>
        <div className='flex justify-between w-96 px-1 '>
          <span onClick={handleClick} className='cursor-pointer bg-red-600 text-white px-5 py-1 rounded-full hover:bg-red-500'>Delete Account</span>
          <span onClick={() => {
            dispatch(statusChange(false))
            localStorage.clear()
            navigate('/signin')
          }} className='cursor-pointer bg-red-600 text-white px-10 py-1 rounded-full hover:bg-red-500'>Sign Out</span>
        </div>
        <button onClick={getListButton} type="button" className='uppercase dosis-dosis-700 bg-blue-950 text-blue-200 active:bg-blue-950 active:text-blue-200 hover:text-blue-950 hover:bg-blue-200 rounded w-96 p-2'>Show Listing</button>
        
</div>
<div className='flex flex-col items-center gap-5'>
{
          list && list.list.map((index)=>{

            // console.log(index.imgURLs)
            return <div key={index._id} className='border w-96 p-2 dosis-dosis-600 rounded-lg border-blue-300 text-blue-950'>

              {/* {console.log(index)} */}

              <p className='text-center uppercase dosis-dosis-800'>For {index.type}</p>

              <img src={index.imgURLs} className='size-52 w-full my-3 rounded-lg'/>
              
              <div>
                Name : {index.name} <br/>
                Regular Price : {index.regularPrice} <br />
                Dicounted Price : {index.discountPrice} <br />
                Bed Rooms : {index.beds} <br />
                Bath Rooms : {index.bath} <br />
                Furnished : {index.furnished?"Available":"Unavailable"} <br />
                Parking : {index.parkingSpot?"Available":"Unavailable"}
              </div>
              <div>
              <div>Address : </div>
              <textarea disabled value={index.address} rows='2' className='w-full'></textarea>
              <div>Description : </div>
              <textarea disabled value={index.description} rows='3' className='w-full'></textarea>
              </div>
              {/* {console.log(index._id)} */}
              <div className='p-3 w-full flex justify-between'>
              {/* <button onClick={async()=>{await deletelist(index._id)}} className='bg-red-400 py-1 px-3 rounded font-semibold hover:bg-red-300'  type="button">DELETE</button> */}
              <button onClick={()=>{updatelist(index)}} className='bg-green-400 py-1 px-3 rounded font-semibold hover:bg-green-300' type="button">UPDATE</button>
              <button onClick={()=>{navigate(`/listing/${index._id}`)}} className='bg-blue-400 py-1 px-3 rounded font-semibold hover:bg-blue-300' type="button">VIEW</button>
              <button onClick={()=>{deleteList(index._id)}} className='bg-red-400 py-1 px-3 rounded font-semibold hover:bg-red-300'  type="button">DELETE</button>
              </div>
              
            </div>


          })
        }
        </div>
    </>
  )
}

export default Profile
