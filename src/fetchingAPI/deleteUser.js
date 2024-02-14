export const deleteUser = async (id) => {
    const response = await fetch(`http://localhost:3000/api/user/delete/${id}` ,{
        method:'DELETE',
        headers:{
            'Content-Type' : 'application/json',
            'auth-token' : localStorage.getItem('token')
        }
    })

    let json = await response.json()
    return (json)

}