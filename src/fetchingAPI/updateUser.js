
export const updateUserinofo = async(id,updateUser)=>{
    // console.log(id);
    // console.log(updateUser);
    
    try {
        document.getElementById('loader').classList.remove('hidden')
    // const response = await fetch (`http://localhost:3000/api/user/update/${id}`, {
    const response = await fetch (`https://realestate-c0ag.onrender.com/api/user/update/${id}`, {
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },body:JSON.stringify(updateUser)
    })
    // console.log(response);//
    const json = await response.json()
    // console.log(response);
    document.getElementById('loader').classList.add('hidden')
    // console.log(json);
    return (json)
    } catch (error) {
        console.log({error:error.message})
    }

}



