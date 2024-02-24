import { Link } from "react-router-dom"


const ListingCard = (props) => {
    const index = props.index
    return (
        <Link to={`listing/${index._id}`}>

            <div className='h-[400px] w-[200px] rounded shadow-md border'>
                <img className='h-[200px] rounded-t w-full' src={index.imgURLs} />
                <div className='m-2 truncate font-medium'>
                    {index.name}
                </div>
                <div className='m-2 line-clamp-2 text-sm'>
                    <i className=" mr-1 fa-solid fa-location-dot fa-2xs" style={{ color: "rgb(21 128 61)" }}></i>
                    {index.address}
                </div>

                <div className='line-clamp-2 text-sm m-2'>
                    {index.description}
                </div>

                <div className='m-2 font-bold truncate text-gray-500' >
                    {index.type === 'rent' ? 'Rs ' + index.regularPrice + ' / Month' : 'Rs' + index.regularPrice}
                </div>

                <div className='m-2 flex gap-2 font-bold'>
                    <div>
                        <i className="fa-solid fa-bed fa-xs" style={!(index.beds === 0) ? { color: "rgb(21 128 61)" } : { color: "rgb(220 38 38)" }}></i> {index.beds}
                    </div>

                    <div>
                        <i className="fa-solid fa-bath fa-xs" style={!(index.bath === 0) ? { color: "rgb(21 128 61)" } : { color: "rgb(220 38 38)" }}></i> {index.bath}
                    </div>

                    <div>
                        <i className="fa-solid fa-square-parking fa-xs" style={(index.parkingSpot) ? { color: "rgb(21 128 61)" } : { color: "rgb(220 38 38)" }}></i>
                    </div>

                    <div>
                        <i className="fa-solid fa-couch fa-xs" style={(index.furnished) ? { color: "rgb(21 128 61)" } : { color: "rgb(220 38 38)" }}></i>
                    </div>
                </div>


            </div>
        </Link>
    )
}

export default ListingCard