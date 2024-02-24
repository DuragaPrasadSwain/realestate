export const updateapiList =async (updatelist) => {
    // console.log(updatelist);
    document.getElementById('loader').classList.remove('hidden')
    const response =await fetch(`http://localhost:3000/api/listing/updatelist/${updatelist._id}`,{
        method:'PUT',
        headers:{
            'content-type':'application/json',
            'auth-token' : localStorage.getItem('token')
        },body:JSON.stringify(updatelist)
    })

    const res =await response.json()
    document.getElementById('loader').classList.add('hidden')
    // console.log(res);

}