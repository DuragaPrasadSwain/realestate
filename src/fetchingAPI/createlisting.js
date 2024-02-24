export const createListing = async (body) => {
    try {
        document.getElementById('loader').classList.remove('hidden')
        const response = await fetch('http://localhost:3000/api/listing/create', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
                
            }, body: JSON.stringify({
                "bath": body.bath,
                "name": body.name,
                "description": body.description,
                "address": body.address,
                "regularPrice": body.regularPrice,
                "discountPrice": body.discountPrice,
                "furnished": body.furnished,
                "beds": body.beds,
                "parkingSpot": body.parkingSpot,
                "type": body.type,
                "offer": body.offer,
                "imgURLs": body.imgURLs,
                "useRef": body.useRef
            })
        })

        // console.log(body.imgURLs);

        const json = await response.json()
        document.getElementById('loader').classList.add('hidden')
        // console.log(json);
        return (json)
    } catch (error) {
        // console.log(error);
        return
    }
}