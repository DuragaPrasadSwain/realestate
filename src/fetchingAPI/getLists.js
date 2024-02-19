export const getList = async () => {
    const responce = await fetch('http://localhost:3000/api/listing/getlist' ,{
        headers:{
            'content-type' : 'application/json',
            'auth-token'  : localStorage.getItem('token')
        }
    })

    let json = await responce.json()

 

    // console.log(json);
    return json
}