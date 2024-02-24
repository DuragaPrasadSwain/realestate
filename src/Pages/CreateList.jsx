import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useState } from 'react'
import { app } from '../firebase'
import { ImageLoader } from '../Components/loader'
import { useSelector } from 'react-redux'
import { createListing } from '../fetchingAPI/createlisting'
import { useNavigate } from 'react-router-dom'

const CreateList = () => {
  const navigate = useNavigate()
  const {currentUser} = useSelector(state => state.user)
  const [files, setfiles] = useState({})
  const [imageUploadError, setimageUploadError] = useState(null)
  const [error , seterror] = useState("")
  const [formdata, setformdata] = useState({
    imgURLs: [],
    useRef:currentUser._id,
    name: "",
    description: "",
    address: "",
    regularPrice: 0,
    discountPrice: 0,
    type: "rent",
    parkingSpot: true,
    furnished: true,
    beds: 1,
    bath: 1,
    offer: true
  })



  //upload of images in firebase from UI

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formdata.imgURLs.length < 7) {
      document.getElementById('imgloader').classList.remove('hidden')
      // console.log("hiii");
      const promises = []

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]))
      }
      Promise.all(promises).then((urls) => {
        setformdata({
          ...formdata,
          imgURLs: formdata.imgURLs.concat(urls)
        })
        setimageUploadError(false)
        document.getElementById('imgloader').classList.add('hidden')
        // console.log("hii2")
      }).catch((err) => {
        setimageUploadError('Image upload failed')
        document.getElementById('imgloader').classList.add('hidden')
      },

      )
    } else {
      setimageUploadError('you can only upload 6 images per listing')
    }
  }


  //Store images in firebase in backend


  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app)
      // console.log(file)
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // console.log(`Upload is${progress}% done`);
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

  //delete of photo handle click
  const handleDelete = (index) => {
    setformdata({ ...formdata, imgURLs: formdata.imgURLs.filter((_, i) => i != index) })
  }




  //onchange handleing

  const onchange = (e) => {
    if (e.target.id === 'sell' ||
      e.target.id === 'rent') {
      setformdata({ ...formdata, type: e.target.id })
    } else if (e.target.id === 'parkingSpot' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer') {
      setformdata({ ...formdata, [e.target.id]: e.target.checked })
    } else {
      setformdata({ ...formdata, [e.target.id]: e.target.value })
    }
  }


  //onsubmit 


  const handleFormSubmit =async (e) => {
    e.preventDefault()
     if(parseInt(formdata.discountPrice) > parseInt(formdata.regularPrice)){
      seterror('Discounted price is higher then regular price');
      return 
     }
     else{
      seterror("")
     }
     if(formdata.imgURLs.length > 6 || formdata.imgURLs.length === 0){
      seterror('You should upload atleast 1 image and less then 7')
     }else{
      seterror("")
     }
    try {
      createListing(formdata)
      navigate('/profile')
    } catch (error) {
      console.log({error})
    }
  }



  return (
    <form onSubmit={handleFormSubmit} className='flex flex-col items-center select-none'>
      <h6 className='text-blue-950 text-7xl dosis-dosis-800 my-5 pt-16 pb-10' >Create a Listing</h6>
      <div className='text-blue-950 dosis-dosis-500 flex flex-col res:flex-row  justify-center gap-5 '>
        <div className='gap-5 flex flex-col'>



          <input required id='name' onChange={onchange} className='bg-blue-300 p-2 rounded' type="text" placeholder='name' />

          <textarea required onChange={onchange} className='bg-blue-300 p-2 rounded' placeholder='Description' id="description" rows="1"></textarea>

          <textarea required onChange={onchange} className='bg-blue-300 p-2 rounded' placeholder='Address' id="address" rows="1"></textarea>

          <div className='flex gap-24'>
            <div className=' border-2 border-black flex items-center bg-red-500 size-4 rounded after:content-["Unchecked"] after:ml-5 '><span></span></div>
            <div className='border-2 border-black flex items-center bg-green-500 size-4 rounded after:content-["Checked"] after:ml-5 '><span></span></div>
          </div>

          <div className='flex gap-5 flex-wrap'>

            <label className='select-none cursor-pointer'>
              <input onChange={onchange} checked={formdata.type === 'sell'} className='border-2 border-black rounded bg-red-500 cursor-pointer appearance-none checked:bg-green-500 size-4' type="checkbox" id="sell" /> Sell
            </label>

            <label className='select-none cursor-pointer'>
              <input onChange={onchange} checked={formdata.type === 'rent'} className=' border-2 border-black rounded bg-red-500 cursor-pointer appearance-none checked:bg-green-500 size-4' type="checkbox" id="rent" /> Rent
            </label>

            <label className='select-none cursor-pointer'>
              <input onChange={onchange} checked={formdata.parkingSpot === true} className='border-2 border-black rounded bg-red-500 cursor-pointer appearance-none checked:bg-green-500 size-4' type="checkbox" id="parkingSpot" /> Parking spot
            </label>

            <label className='select-none cursor-pointer'>
              <input onChange={onchange} checked={formdata.furnished === true} className='border-2 border-black rounded bg-red-500 cursor-pointer appearance-none checked:bg-green-500 size-4' type="checkbox" id="furnished" /> Furnished
            </label>

            <label className='select-none cursor-pointer'>
              <input onChange={onchange} checked={formdata.offer === true} className='border-2 border-black rounded bg-red-500 cursor-pointer appearance-none checked:bg-green-500 size-4' type="checkbox" id="offer" /> Offer
            </label>

          </div>
          <div className='flex gap-5'>
            <label>
              <input onChange={onchange} value={formdata.beds} className='bg-blue-300 size-5 w-16 rounded py-4 px-2' type="number" min={1} max={10} id="beds" /> Beds
            </label>
            <label>
              <input onChange={onchange} value={formdata.bath} className='bg-blue-300 size-5 w-16 rounded py-4 px-2' type="number" min={1} max={10} id="bath" /> Baths
            </label>
          </div>
          <label className='flex items-center gap-2'>
            <input onChange={onchange} placeholder='0' className='bg-blue-300 size-5 w-36 rounded py-4 px-2' type="number" id="regularPrice" /> <div className='flex flex-col text-center'><span>Regular price</span>{formdata.type==='rent' && <span className='text-xs dosis-dosis-800'>( Rs/Month )</span>}</div>
          </label>

         {formdata.offer && <label className='flex items-center gap-2'>
            <input onChange={onchange} placeholder='0' className='bg-blue-300 size-5 w-36 rounded py-4 px-2' type="number" id="discountPrice" /> <div className='flex flex-col text-center'><span>Discounted price</span></div>
          </label>}

        </div>
        <div>
          <span className='dosis-dosis-800'>Images:</span>
          <span>The first image will be the cover ( max 6 )</span>

          <div className=' my-5 flex flex-col items-center gap-4'>
            <div className='flex gap-3'>
              <input required onChange={(e) => { setfiles(e.target.files) }}
                className='cursor-pointer border-2 p-4 rounded border-blue-300 block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100' type="file" id="images" accept='image/*' multiple />
              <button onClick={handleImageSubmit} className='dosis-dosis-700 bg-blue-950 text-blue-200 active:bg-blue-950 active:text-blue-200 hover:text-blue-950 hover:bg-blue-200 rounded w-36 p-2 ' type="button">UPLOAD</button>

            </div>
            <div className='w-full p-3'>
              {formdata.imgURLs.length > 0 && formdata.imgURLs.map((url, index) => {


                // {console.log(url)}
                return <div key={url} className='flex justify-between w-full my-5 border-2 rounded-lg border-blue-300 p-2'>
                  <img src={url} alt='images' className='size-44 rounded-lg' />
                  <button onClick={() => handleDelete(index)} type='button' className='hover:bg-red-200 hover:text-red-600 bg-red-500 text-white p-2 rounded-lg'>DELETE</button>
                </div>

              })}
              <ImageLoader />
            </div>
            <button type='submit' className='dosis-dosis-700 bg-blue-950 text-blue-200 active:bg-blue-950 active:text-blue-200 hover:text-blue-950 hover:bg-blue-200 rounded w-full p-2 '>CREATE LIST</button>
            <p className='text-red-500'>{imageUploadError && imageUploadError}</p>
            <p className='text-red-500'>{error}</p>
          </div>
        </div>
      </div>
    </form>
  )
}

export default CreateList
