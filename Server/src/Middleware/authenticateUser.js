const jwt = require('jsonwebtoken')
const User = require('../Models/user')
const redisClient = require('../Config/RedisDB')

const authenticateUser = async (req, res, next)=>{

   try {

      const Token = req.cookies?.Token || req.headers.authorization?.split(" ")[1];
      if (!Token)
         return res.status(401).send("Unauthorized")

      const isBlocked = await redisClient.exists(`Token: ${Token}`)

      if(isBlocked)
         return res.status(401).send('Invalid token')

      const payload = jwt.verify(Token, process.env.SECRET_KEY)

      req.payload = payload

      const user = await User.findById(payload._id)
      req.user = user
        // console.log(payload)

      next()

   } catch (error) {
      return res.status(500).send(error.message)
   }
}

module.exports = authenticateUser
