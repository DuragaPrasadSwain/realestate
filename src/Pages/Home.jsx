import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ListingCard from '../Components/ListingCard';

const Home = () => {

  let location = useLocation();
  let navigate = useNavigate();
  const [offerListing, setofferListing] = useState([])
  const [saleListing, setsaleListing] = useState([])
  const [rentListing, setrentListing] = useState([])
  const [all, setall] = useState(null)
  const [ready,setready] = useState(false)

  React.useEffect(() => {
    if (!(localStorage.getItem('token'))) {
      navigate('/signin')
    }
    const fetchingOfferListing = async () => {
      try {
        document.getElementById('loader').classList.remove('hidden')
        const res = await fetch('http://localhost:3000/api/search/searchlist?offer=true&limit=5')
        const data = await res.json()
        document.getElementById('loader').classList.add('hidden')
        console.log(data);
        setofferListing(data)
        fetchingRentListing()
      } catch (error) {
        console.log(error);
      }
    }

    const fetchingRentListing = async () => {
      try {
        document.getElementById('loader').classList.remove('hidden')
        const res = await fetch('http://localhost:3000/api/search/searchlist?type=rent&limit=5')
        const data = await res.json()
        document.getElementById('loader').classList.add('hidden')
        setrentListing(data);
        
        fetchingSaleListing()
      } catch (error) {
        console.log(error);
      }
    }

    const fetchingSaleListing = async () => {
      try {
        document.getElementById('loader').classList.remove('hidden')
        // const res = await fetch('http://localhost:3000/api/search/searchlist?type=sell&limit=5')
        const res = await fetch('https://realestate-c0ag.onrender.com/api/search/searchlist?type=sell&limit=5')
        const data = await res.json()
        document.getElementById('loader').classList.add('hidden')
        setsaleListing(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchingOfferListing()


  }, []);



console.log();

  return (
    <div>
      <div className='pt-44 pl-28 flex flex-col gap-10'>
        <div className='text-6xl font-bold text-blue-950'>
          Find your next <span className='text-blue-400'>perfect</span> <br />
          place with ease
        </div>

        <div className='text-blue-400'>
          <span><span className='text-yellow-400 font-bold'>DREAM</span><span className='text-orange-400 font-bold'>HOME</span> is the next perfect place to live </span><br />
          <span>We have a wide range of properties for you to choose from</span>
        </div>


        <Link to='/search' className='text-lg font-semibold text-blue-600 '>
          <span className='hover:underline'>
            Let's get started.....
          </span> 
        </Link>

      </div>



      <div className='my-20'>
        <Swiper navigation = {true} modules={[Navigation]}>
          {
            offerListing && offerListing.length > 0 && offerListing.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div style={{
                  background: `url(${listing.imgURLs[0]}) center no-repeat`,
                  backgroundSize: 'cover'
                }}
                  className='h-[500px]'
                  key={listing._id}></div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>



      <div>

        <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
          {
            offerListing && offerListing.length > 0 &&
            <div className=''>
              <div>
                <h2 className='text-xl font-bold text-blue-800'>Recent offers</h2>
                <Link to={"/search?offer=true"} className='text-blue-500 font-semibold text-sm hover:underline' >
                  Show more offers
                </Link>
              </div>
              <div className='mr-5 my-5 flex gap-16'>
                {
                offerListing.map((index) => (
                  <ListingCard index = {index} key = {index._id}/>
                ))
                }
              </div>
            </div>
          }

          {
            rentListing && rentListing.length > 0 &&
            <div className=''>
              <div className=' '>
                <h2 className='text-xl font-bold text-blue-800'>Recent Rent offers</h2>
                <Link to={"/search?type=rent"} className='text-blue-500 font-semibold text-sm hover:underline'>
                  Show more offers
                </Link>
              </div>
              <div className='mr-5 my-5 flex gap-16'>
                {
                  rentListing.map((index) =>( 
                    <ListingCard index = {index} key = {index._id}/>
                  ))
                }
              </div>
            </div>
          }

          {
            saleListing && saleListing.length > 0 &&

            
            <div className=''>
              <div className=' '>
                <h2 className='text-xl font-bold text-blue-800'>Recent Sale offers</h2>
                <Link to={"/search?type=sell"} className='text-blue-500 font-semibold text-sm hover:underline'>
                  Show more offers
                </Link>
              </div>
              <div className='mr-5 my-5 flex gap-16'>
                {
                  saleListing.map((index) => ( 
                    <ListingCard index = {index} key = {index._id}/>
                  ))
                }
              </div>
            </div>
          }
        </div>

      </div>



    </div>
  )
}

export default Home
