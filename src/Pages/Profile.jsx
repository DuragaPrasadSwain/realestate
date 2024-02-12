import React from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import fetchUser from '../fetchingAPI/fetchUser';

const Profile = () => {
  let location = useLocation();
  let navigate = useNavigate()
 
  fetchUser()

  React.useEffect(() => {
    if(!(localStorage.getItem('token'))){
      navigate('/signin')
    }
  }, [location]);

  

  return (
    <div>
      
    </div>
  )
}

export default Profile
