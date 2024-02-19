export const getAlist = async (id) => {
    const responce = await fetch(`http://localhost:3000/api/listing/getalist/${id}` ,{
        headers:{
            'content-type' : 'application/json'
        }
    })

    let json = await responce.json()

 

    console.log(json);
    return json
}