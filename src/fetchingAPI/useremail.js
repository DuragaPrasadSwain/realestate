export const userEmail = async (id) => {
    document.getElementById('loader').classList.remove('hidden')
    // console.log(id);
    // const responce = await fetch(`http://localhost:3000/api/user/fetchauser/${id}`,{
    const responce = await fetch(`https://realestate-c0ag.onrender.com/api/user/fetchauser/${id}`,{
        method:'GET',
        headers:{
            'content-Type':'application/json'
        }
    })
    const res = await responce.json()
    document.getElementById('loader').classList.add('hidden')
    return res
}