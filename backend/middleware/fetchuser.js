const jwt = require('jsonwebtoken');

JWT_SECRET = 'DURGAPRASADSWAIN@123'

const fetchuser = async(req,res,next) => {

    const token = await req.header('auth-token')

    if(!token){
        return res.status(401).json({error:'you are not a valid user'})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET)

        req.body = data.user
        console.log(data)
        next();
    } catch (error) {
        return res.status(401).json({error:'Please authantcicate using a valid token'})
    }


}


module.exports = fetchuser;