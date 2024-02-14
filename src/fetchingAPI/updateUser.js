
export const updateUserinofo = async(id,updateUser)=>{
    try {
    const response = await fetch (`http://localhost:3000/api/user/update/${id}`, {
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },body:JSON.stringify(updateUser)
    })
    const json = await response.json()
    console.log(json);
    return (json)
    } catch (error) {
        console.log({error:error.message})
    }

}



