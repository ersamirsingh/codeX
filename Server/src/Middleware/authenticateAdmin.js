const jwt = require('jsonwebtoken')
const User = require('../Models/user')
const redisClient = require('../Config/RedisDB')

const authenticateAdmin = async (req, res, next)=>{

    try {
        
        const {Token} = req.cookies
        if(!Token)
            throw new Error('Token not Found')

        const isBlocked = await redisClient.exists(`Token: ${Token}`)

        if(isBlocked)
            throw new Error('Invalid token')

        const payload = jwt.verify(Token, process.env.SECRET_KEY)

        if(payload.role != 'admin'){
            throw new Error('You are not an admin');
        }

        req.payload = payload
        // console.log(payload)

        const user = await User.findById(payload._id)
        req.user = user
        // console.log(req.user)

        next()

    } catch (error) {
        return res.status(401).send('Error occured: '+error.message)
    }
}

module.exports = authenticateAdmin