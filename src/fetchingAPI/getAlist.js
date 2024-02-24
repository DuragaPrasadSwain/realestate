export const getAlist = async (id) => {
    document.getElementById('loader').classList.remove('hidden')
    const responce = await fetch(`http://localhost:3000/api/listing/getalist/${id}` ,{
        headers:{
            'content-type' : 'application/json'
        }
    })

    let json = await responce.json()

 
    document.getElementById('loader').classList.add('hidden')
    // console.log(json);
    return json
}