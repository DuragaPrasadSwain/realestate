import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Search = () => {

    const navigate = useNavigate()

    const [sidebarData, setsidebarData] = useState({
        type:'all',
        parking:false,
        furnished:false,
        offer:false,
        sort:'created_at',
        order:'desc'
    });

    const [listingData, setlistingData] = useState(null)
    const [showMore, setshowMore] = useState(false)


    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const typeFromURL = urlParams.get('type');
        const parkingFromURL = urlParams.get('parking');
        const furnishedFromURL = urlParams.get('furnished');
        const offerFromURL = urlParams.get('offer');
        const sortFromURL = urlParams.get('sort');
        const orderFromURL = urlParams.get('order');

        if(
            typeFromURL ||
            parkingFromURL ||
            furnishedFromURL ||
            offerFromURL ||
            sortFromURL ||
            orderFromURL 
        ){
            setsidebarData({
                type: typeFromURL || 'all',
                parking: parkingFromURL  === 'true' ? true:false,
                furnished: furnishedFromURL  === 'true' ? true:false,
                offer: offerFromURL  === 'true' ? true:false,
                sort: sortFromURL || 'created_at',
                order: orderFromURL || 'desc'
            })
        }

        const fetchListing =async () => {
            setshowMore(false)
            const searchQuery = urlParams.toString()
            document.getElementById('loader').classList.remove('hidden')
            // const  res = await fetch (`http://localhost:3000/api/search/searchlist?${searchQuery}`)
            const  res = await fetch (`https://realestate-c0ag.onrender.com/api/search/searchlist?${searchQuery}`)
            const data = await res.json()
            document.getElementById('loader').classList.add('hidden')
            setlistingData(data)
            if(data.length > 9){
                setshowMore(true)
            }else{
                setshowMore(false)
            }
        }
        fetchListing()
  
    },[location.search])


    const handleChange = (e) => {

        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sell'){
            setsidebarData({...sidebarData, type: e.target.id})
        }

        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setsidebarData({...sidebarData, [e.target.id] : e.target.checked})
        }
        
        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'created_at';

            const order = e.target.value.split('_')[1] || 'desc';

            setsidebarData({...sidebarData, sort, order})
        }


    }



    const handleSubmit = (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('type' , sidebarData.type)
        urlParams.set('parking' , sidebarData.parking)
        urlParams.set('furnished' , sidebarData.furnished)
        urlParams.set('offer' , sidebarData.offer)
        urlParams.set('sort' , sidebarData.sort)
        urlParams.set('order' , sidebarData.order)

        const searchQuery = urlParams.toString()

        navigate(`/search?${searchQuery}`)
    }

    const onShowMoreClick =async (e) =>{
        e.preventDefault()
        const numberOfListing = listingData.length;
        const urlParams = new URLSearchParams(location.search)
        const startIndex = numberOfListing
        urlParams.set('startIndex' , startIndex)
        const searchQuery = urlParams.toString()
        document.getElementById('loader').classList.remove('hidden')
        // const res = await fetch(`http://localhost:3000/api/search/searchlist?${searchQuery}`)
        const res = await fetch(`https://realestate-c0ag.onrender.com/api/search/searchlist?${searchQuery}`)
        const data = await res.json() 
        document.getElementById('loader').classList.add('hidden')
        if(data.length < 9 ){
            setshowMore(false)
        }
        setlistingData([...listingData , ...data])
    } 


    return (
        <>
            <div className='pt-12 flex flex-col res:flex-row'>
                <form onSubmit={handleSubmit} className='pr-5 w-96 pl-5 pt-5 h-full res:h-screen border-b res:border-r flex flex-col gap-5'>
                    <p className='dosis-dosis-700 text-2xl'>Filter -</p>
                    <div className='flex gap-5 flex-wrap '>
                        <span>Type: </span>
                        <label htmlFor="all">

                            <input type="checkbox" id='all' onChange={handleChange} checked={sidebarData.type === 'all'}/> Rent & Sale

                        </label>
                        <label htmlFor="rent">

                            <input id='rent' type="checkbox" onChange={handleChange} checked={sidebarData.type === 'rent'} /> Rent

                        </label>
                        <label htmlFor="sell">

                            <input id='sell' type="checkbox" onChange={handleChange} checked={sidebarData.type === 'sell'}/> Sale

                        </label>
                        <label htmlFor="offer">

                            <input id='offer' type="checkbox" onChange={handleChange} checked={sidebarData.offer}/> Offer

                        </label>
                    </div>

                    <div className='flex gap-5'>
                        <span>Amanities: </span>

                        <label htmlFor="parking">
                            <input id='parking' type="checkbox" onChange={handleChange} checked={sidebarData.parking}/> Parking
                        </label>

                        <label htmlFor="furnished">
                            <input type="checkbox" id='furnished' checked={sidebarData.furnished} onChange={handleChange} /> Furnished
                        </label>

                    </div>

                    <div>
                        <label htmlFor="sort">
                            Sort: <select onChange={handleChange} defaultValue={'created_at_desc'} id="sort_order" className='border p-1 rounded-lg'>
                                {/* <option value="All">All</option> */}
                                <option value="createdAt_desc">Latest</option>
                                <option value="createdAt_asc">Oldest</option>
                                <option value="regularPrice_desc">Price high to low</option>
                                <option value="regularPrice_asc">Price low to high</option>
                            </select>
                        </label>
                    </div>

                    <button className='mt-5 w-full cursor-pointer p-2 uppercase text-center font-bold rounded-lg bg-blue-950 border-2 active:bg-blue-950 active:text-blue-200 hover:bg-blue-200 hover:text-blue-950 
          hover:border-blue-950 text-blue-200 mb-4 focus:outline-none'>search</button>


                </form>

                <div className='p-5'>
                    <span className='dosis-dosis-700 text-2xl' >Results -</span>

                    <div className='flex flex-wrap gap-10'>
                        {console.log(listingData)}
                        {
                            listingData && listingData.length > 0 && listingData.map((index)=>(
                                    <Link key={index._id} to={`/listing/${index._id}`}>
                                    <div className='h-[400px] w-[200px] rounded shadow-md border'>
                                        <img className='h-[200px] rounded-t w-full' src={index.imgURLs}/>
                                        <div className='m-2 truncate font-medium'>
                                            {index.name}
                                        </div>

                                        <div className='m-2 text-sm line-clamp-2'>
                                        <i className=" mr-1 fa-solid fa-location-dot fa-2xs" style={{ color: "rgb(21 128 61)" }}></i>
                                        {index.address}
                                        </div>

                                        <div className='line-clamp-2 text-sm m-2'>
                                            {index.description}
                                        </div>

                                        <div className='m-2 font-bold truncate text-gray-500' >
                                            {index.type === 'rent'?'Rs ' + index.regularPrice +' / Month' : 'Rs' + index.regularPrice}
                                        </div>

                                        <div className='m-2 flex gap-2 font-bold'>
                                            <div>
                                            <i className="fa-solid fa-bed fa-xs" style={!(index.beds === 0)?{color: "rgb(21 128 61)"}:{color: "rgb(220 38 38)"}}></i> {index.beds}
                                            </div>

                                            <div>
                                            <i className="fa-solid fa-bath fa-xs" style={!(index.bath === 0)?{color: "rgb(21 128 61)"}:{color: "rgb(220 38 38)"}}></i> {index.bath}
                                            </div>
                                            
                                            <div>
                                            <i className="fa-solid fa-square-parking fa-xs" style={(index.parkingSpot)?{color: "rgb(21 128 61)"}:{color: "rgb(220 38 38)"}}></i>
                                            </div>

                                            <div>
                                            <i className="fa-solid fa-couch fa-xs" style={(index.furnished)?{color: "rgb(21 128 61)"}:{color: "rgb(220 38 38)"}}></i>
                                            </div>
                                        </div>


                                    </div>
                                    </Link>
                            ))
                        }
                    </div>

                    {showMore && <div className='text-center m-7'>
                        <button onClick={onShowMoreClick} className='mt-5 w-full cursor-pointer p-2 uppercase text-center font-bold rounded-lg bg-blue-950 border-2 active:bg-blue-950 active:text-blue-200 hover:bg-blue-200 hover:text-blue-950 
          hover:border-blue-950 text-blue-200 mb-4 focus:outline-none'>
                            show more
                        </button>
                    </div>}

                </div>
            </div>
        </>
    )
}

export default Search
