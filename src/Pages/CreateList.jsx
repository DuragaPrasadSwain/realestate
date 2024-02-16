import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useState } from 'react'
import { app } from '../firebase'

const CreateList = () => {
  const [files,setfiles] = useState({})
  const [imageUploadError,setimageUploadError] = useState(null)
  const [formdata,setformdata] = useState({
    imageUrls:[],
  })
  console.log(formdata);
  const handleImageSubmit = (e) => {
    if(files.length > 0 && files.length + formdata.imageUrls.length < 7){
      const promises = []

      for(let i = 0 ; i < files.length; i++){
        promises.push(storeImage(files[i]))
      }
      Promise.all(promises).then((urls) => {
        setformdata({
          ...formdata,
          imageUrls: formdata.imageUrls.concat(urls)
        })
        setimageUploadError(false)
      }).catch((err) =>{
        setimageUploadError('Image upload failed')
      })
    }else{
      setimageUploadError('you can only upload 6 images per listing')
    }
  } 

  const storeImage = async (file) => {
    return new Promise((resolve,reject) => {
      const storage = getStorage(app)
      console.log(file)
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`Upload is${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          })
        }
      )
    })
  }

  return (
    <div className='flex flex-col items-center'>
<h6 className='text-7xl dosis-dosis-800 my-5 pt-16 pb-10' >Create a Listing</h6>
<div className='text-blue-950 dosis-dosis-500 flex flex-col res:flex-row  justify-center gap-5 '>
      <div className='gap-5 flex flex-col'>

        

        <input className='bg-blue-300 p-2 rounded' type="text" placeholder='name' />

        <textarea className='bg-blue-300 p-2 rounded' placeholder='Description' id="description" rows="1"></textarea>

        <textarea className='bg-blue-300 p-2 rounded' placeholder='Address' id="address" rows="1"></textarea>

        <div className='flex gap-24'>
          <div className= ' border-2 border-black flex items-center bg-red-500 size-4 rounded after:content-["Unchecked"] after:ml-5 '><span></span></div>
          <div className='border-2 border-black flex items-center bg-green-500 size-4 rounded after:content-["Checked"] after:ml-5 '><span></span></div>
        </div>

        <div className='flex gap-5 flex-wrap'>

          <label className='select-none cursor-pointer'>
            <input className='border-2 border-black rounded bg-red-500 cursor-pointer appearance-none checked:bg-green-500 size-4' type="checkbox" id="sell" /> Sell
          </label>

          <label className='select-none cursor-pointer'>
            <input className=' border-2 border-black rounded bg-red-500 cursor-pointer appearance-none checked:bg-green-500 size-4' type="checkbox" id="rent" /> Rent
          </label>

          <label className='select-none cursor-pointer'>
            <input className='border-2 border-black rounded bg-red-500 cursor-pointer appearance-none checked:bg-green-500 size-4' type="checkbox" id="parking" /> Parking spot
          </label>

          <label className='select-none cursor-pointer'>
            <input className='border-2 border-black rounded bg-red-500 cursor-pointer appearance-none checked:bg-green-500 size-4' type="checkbox" id="furnished" /> Furnished
          </label>

          <label className='select-none cursor-pointer'>
            <input className='border-2 border-black rounded bg-red-500 cursor-pointer appearance-none checked:bg-green-500 size-4' type="checkbox" id="offer" /> Offer
          </label>

        </div>
        <div className='flex gap-5'>
          <label>
            <input className='bg-blue-300 size-5 w-16 rounded py-4 px-2' type="number" min={1} max={10} id="beds" /> Beds
          </label>
          <label>
            <input className='bg-blue-300 size-5 w-16 rounded py-4 px-2' type="number" min={1} max={10} id="baths" /> Baths
          </label>
        </div>
        <label className='flex items-center gap-2'>
          <input className='bg-blue-300 size-5 w-36 rounded py-4 px-2' type="number" id="Rprice" /> <div className='flex flex-col text-center'><span>Regular price</span><span className='text-xs dosis-dosis-800'>( Rs/Month )</span></div>
        </label>
        <label className='flex items-center gap-2'>
          <input className='bg-blue-300 size-5 w-36 rounded py-4 px-2' type="number" id="Dprice" /> <div className='flex flex-col text-center'><span>Discounted price</span><span className='text-xs dosis-dosis-800'>( Rs/Month )</span></div>
        </label>

      </div>
      <div>
        <span className='dosis-dosis-800'>Images:</span>
        <span>The first image will be the cover ( max 6 )</span>
      
      <div className=' my-5 flex flex-col items-center gap-4'>
        <div className='flex gap-3'>
        <input onChange={(e)=> {setfiles(e.target.files)}}
        className='cursor-pointer border-2 p-4 rounded border-blue-300    block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-50 file:text-blue-700
      hover:file:bg-blue-100' type="file" id="images" accept='image/*' multiple />
        <button onClick={handleImageSubmit} className='dosis-dosis-700 bg-blue-950 text-blue-200 active:bg-blue-950 active:text-blue-200 hover:text-blue-950 hover:bg-blue-200 rounded w-36 p-2 ' type="button">UPLOAD</button>
        
        </div>
        <div className='w-full p-3'>
          {formdata.imageUrls.length > 0 && formdata.imageUrls.map((url)=>{
            
            
              // {console.log(url)}
              return <div className='flex justify-between w-full my-5 border-2 rounded-lg border-blue-300 p-2'>
                <img src={url} key={url} alt='images' className='size-44 rounded-lg'/>
                <button className='bg-red-500 text-white p-2 rounded-lg'>DELETE</button>
              </div>
            
          })}
        </div>
        {/* <img src={'https://firebasestorage.googleapis.com/v0/b/estate-9396a.appspot.com/o/1708106342637IMG_20220921_103036.jpg?alt=media&token=00aa303c-5609-44d7-9a6e-da0c00c1d146'} className='size-20'/> */}
        <button className='dosis-dosis-700 bg-blue-950 text-blue-200 active:bg-blue-950 active:text-blue-200 hover:text-blue-950 hover:bg-blue-200 rounded w-full p-2 '>UPDATE</button>
        <p>{imageUploadError && imageUploadError}</p>
      </div>
      </div>
      </div>
    </div>
  )
}

export default CreateList
