export const getList = async () => {
    document.getElementById('loader').classList.remove('hidden')
    // const responce = await fetch('http://localhost:3000/api/listing/getlist' ,{
    const responce = await fetch('https://realestate-c0ag.onrender.com/api/listing/getlist' ,{
        headers:{
            'content-type' : 'application/json',
            'auth-token'  : localStorage.getItem('token')
        }
    })

    let json = await responce.json()

 
    document.getElementById('loader').classList.add('hidden')
    // console.log(json);
    return json
}