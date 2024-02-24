export const deleteUser = async (id) => {
    document.getElementById('loader').classList.remove('hidden')
    // const response = await fetch(`http://localhost:3000/api/user/delete/${id}` ,{
    const response = await fetch(`https://realestate-c0ag.onrender.com/api/user/delete/${id}` ,{
        method:'DELETE',
        headers:{
            'Content-Type' : 'application/json',
            'auth-token' : localStorage.getItem('token')
        }
    })

    let json = await response.json()
    document.getElementById('loader').classList.add('hidden')
    return (json)

}