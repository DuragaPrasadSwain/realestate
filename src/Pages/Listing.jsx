import React, { useEffect, useRef, useState } from 'react'
import { getAlist } from '../fetchingAPI/getAlist'
import { Link, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import { useSelector } from 'react-redux';
import { userEmail } from '../fetchingAPI/useremail';

const Listing = () => {

  SwiperCore.use({ Navigation })
  const ref = useRef()
  const {loginStatus} = useSelector(state => state.user)
  const params = useParams()
  const [listing, setlisting] = useState(null)
  const [landloard , setlandloard] = useState(null)
  const [message , setmessage] = useState(null)

const onchange = (e) => {
  setmessage(e.target.value)
}

  useEffect(() => {

    let data = async () => {
      let a = await getAlist(params.id)
      setlisting(a)
    }
    data();
  }, [params.id])

  useEffect(()=>{
    let data =async () => {
      if(loginStatus && listing){
        let b = await userEmail(listing.useRef)
        setlandloard(b)
      }
    }
    data()
  },[listing])

  const handleClick = () =>{
    ref.current.click()
  }
  return (
    <main>
      {listing && (<div className='pt-12 res:pt-16'>
        <Swiper navigation={true} modules={[Navigation]} >
          {listing.imgURLs.map((url) => (
            <SwiperSlide key={url}>
              <div className='h-[550px]' style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover' }}>

              </div>
            </SwiperSlide>)
          )}
        </Swiper>
      </div>)}
      {listing &&
        <div className='flex flex-col px-10'>

          <div className='dosis-dosis-700 my-6 text-3xl'>
            <span>{listing.name}- </span>
            <span>{listing.regularPrice}</span>
            {listing.type === 'rent' && <span> / Month</span>}
          </div>

          <div className='flex items-center gap-2 text-base'>
            <i className="fa-solid fa-location-dot fa-sm" style={{ color: "rgb(21 128 61)" }}></i>
            <span>{listing.address}</span>
          </div>
          <div className='py-5 h-19 flex gap-5'>
            <div className='bg-red-700 uppercase font-bold h-8 rounded-lg flex items-center justify-center w-36 te text-white'><span>{listing.type}</span></div>
            {listing.offer && <div className='bg-green-700 uppercase font-bold h-8 rounded-lg flex items-center justify-center w-36 te text-white'><span>-{listing.discountPrice}%</span></div>}
          </div>

          <span className='font-bold mb-3'>Description -</span>
          {/* <span className='first-letter:text-5xl first-letter:float-left first-letter:font-semibold first-letter:mr-2 first-letter:uppercase'>{listing.description}</span> */}
          <span className='first-letter:uppercase'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, rerum quas inventore nihil nostrum sapiente deserunt molestias quo, consequatur officiis natus libero magni illo explicabo possimus! Est, dolorem nesciunt quod nemo alias, rem modi eligendi temporibus illum et consequatur, ipsam mollitia voluptate nihil nisi quia aspernatur id iste libero atque debitis sapiente ratione sed enim. Aperiam sint numquam repudiandae nemo rerum similique ipsa veritatis, eius aspernatur pariatur possimus odio error laborum molestias quidem. Qui quidem tempora repellat eius, ratione dolor fugiat aliquid! Rerum reiciendis ad ducimus facere laboriosam dolorem nam corporis incidunt consequuntur esse. Et praesentium illum laborum ut ipsam.</span>

          <div className='my-3 flex gap-10'>
            <div className=''>
              <i className="fa-solid fa-bed" style={{ color: "rgb(21 128 61)" }}></i>
              <span className='font-bold'> {listing.beds} Bed</span>
            </div>
            <div className=''>
              <i className="fa-solid fa-bath" style={{ color: "rgb(21 128 61)" }}></i>
              <span className='font-bold'> {listing.bath} Bath</span>
            </div>
            <div className=''>
              <i className="fa-solid fa-square-parking" style={{ color: "rgb(21 128 61)" }}></i>
              <span className='font-bold'> {listing.parkingSpot ? 'Available' : 'Unavailable'}</span>
            </div>
            <div className=''>
              <i className="fa-solid fa-couch" style={{ color: "rgb(21 128 61)" }}></i>
              <span className='font-bold'> {listing.furnished ? 'Furnished' : 'unfurnished'}</span>
            </div>
          </div>

          {
            !loginStatus && <div className='mb-2 bg-yellow-200 p-2 text-center rounded-lg w-full '>
            <i className="fa-solid fa-exclamation fa-xl" style={{color: "#FF0000"}}></i> Login if you want to contact house owner
            </div>
          }
      {
        !loginStatus && <Link to='/signin'>
          
          <button className='w-full cursor-pointer p-2 uppercase text-center font-bold rounded-lg bg-blue-950 border-2 active:bg-blue-950 active:text-blue-200 hover:bg-blue-200 hover:text-blue-950 
          hover:border-blue-950 text-blue-200 mb-4 focus:outline-none'>
            login
          </button>
        </Link>
      }
          {
        loginStatus &&
        <div>
        
        <textarea onChange={onchange} className='p-3 border w-full my-5 rounded border-blue-300'  placeholder='Write your mail.....' id="sendemail" rows="5"></textarea>
        <button onClick={handleClick}  className='w-full cursor-pointer p-2 uppercase text-center font-bold rounded-lg bg-blue-950 border-2 active:bg-blue-950 active:text-blue-200 hover:bg-blue-200 hover:text-blue-950 
          hover:border-blue-950 text-blue-200 mb-4 focus:outline-none'>
        send mail
        </button>
        <Link ref={ref} to={`mailto:${landloard}?subject=Regarding ${listing.name}&body=${message}`} ></Link>
        </div>
      }
        </div>
      }

    </main>
  )
}

export default Listing
