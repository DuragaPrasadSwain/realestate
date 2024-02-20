export const userEmail = async (id) => {
    console.log(id);
    const responce = await fetch(`http://localhost:3000/api/user/fetchauser/${id}`,{
        method:'GET',
        headers:{
            'content-Type':'application/json'
        }
    })
    const res = await responce.json()

    return res
}