import React from 'react'
import {useLocation,useNavigate} from 'react-router-dom'

const Home = () => {

  let location = useLocation();
  let navigate = useNavigate()

  React.useEffect(() => {
    if(!(localStorage.getItem('token'))){
      navigate('/signin')
    }
    // Google Analytics
    console.log(location)
  }, [location]);


  


  return (
    <div>
      
    </div>
  )
}

export default Home
