// import { useDispatch } from "react-redux";
// import { signInSuccess } from "../redux/reducer/userSlice";



export const fetchUser = async() =>{


// const dispatch = useDispatch()
    
    const response = await fetch('http://localhost:3000/api/auth/fetchuser',{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            'auth-token':`${localStorage.getItem('token')}`
        }
    })

    const json = await response.json()

    console.log(json);


    return (json)
    // dispatch(signInSuccess(json))   
}




// export default fetchUser