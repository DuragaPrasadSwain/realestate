export const deletelist = async(id) => {
    console.log("hii");
    const responce = await fetch (`http://localhost:3000/api/listing/deletelist/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        }
    })
}