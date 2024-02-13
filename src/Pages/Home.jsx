import React from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import fetchUser from '../fetchingAPI/fetchUser';

const Home = () => {

  let location = useLocation();
  let navigate = useNavigate()
  
  React.useEffect(() => {
    // fetchUser()
    if(!(localStorage.getItem('token'))){
      console.log("hiiiiiii")
      navigate('/signin')
    }else{
      console.log("hiiiiiii789")
      
    }
    // Google Analytics
    console.log(location)
  }, [location]);


  fetchUser()


  return (
    <div>
      
    </div>
  )
}

export default Home
