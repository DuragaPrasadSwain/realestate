const jwt = require('jsonwebtoken');

JWT_SECRET = 'DURGAPRASADSWAIN@123'

const fetchuser = async(req,res,next) => {
    // console.log(req.header('auth-token'));

    const token = await req.header('auth-token')

    if(!token){
        return res.status(401).json({error:'you are not a valid user'})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET)
        // console.log(data.user);
        req.body = data.user
        // console.log(req.body)
        await next();

        // console.log("hiiiiiiiii5");
    } catch (error) {
        return res.status(401).json({error:'Please authantcicate using a valid token'})
    }
    // const data = jwt.verify(token,JWT_SECRET)
    // req.user = data.user


}


module.exports = fetchuser;