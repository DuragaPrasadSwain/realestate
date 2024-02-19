import React, { useEffect, useState } from 'react'
import { getAlist } from '../fetchingAPI/getAlist'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper';
import { Navigation,Pagination,Scrollbar } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';

const Listing = () => {

  SwiperCore.use({Navigation})
  const params = useParams()
  const [listing,setlisting] = useState(null)
  const [loading,setloading] = useState(true)
  const [Error,setError] = useState(false)

  useEffect(()=>{
    
    let  data = async()=> {
      let a = await getAlist(params.id)
      setlisting(a)
      console.log(a);
    }
    // console.log(listing);
    data();
  },[params.id])

  console.log(listing)

  return (
    <main>
      {listing && (<div className='pt-16'>
        <Swiper navigation = {true} modules={[Navigation]} >
          {listing.imgURLs.map((url) => (
          <SwiperSlide key={url}>
            <div className='h-[550px]' style={{background:`url(${url}) center no-repeat` , backgroundSize: 'cover'}}>

            </div>
          </SwiperSlide>)
            )}
        </Swiper>
      </div>)}
    </main>
  )
}

export default Listing
