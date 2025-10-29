const User = require('../Models/user')
const Submission = require('../Models/submission')
const validate = require('../Utils/Valiadtor')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const redisClient = require('../Config/RedisDB')



const register = async (req, res)=>{

    try {

        const result = validate(req.body)
        
        if(!result.success)
            throw new Error('validation failed ', result.error)
        
        const {emailId, password} = req.body

        //is user already exists
        let user = await User.findOne({emailId:emailId})
        if(user)
            return res.status(404).send('user already exists with this email')

        //Hash the password
        req.body.password = await bcrypt.hash(password, 10)
        req.body.role = 'user'

        //User creation
        user = await User.create(req.body)

        if(!user)
            return res.status(404).send('User not registered')

        //JWT
        const token = jwt.sign({_id: user._id, emailId: emailId, role:"user"}, process.env.SECRET_KEY, {expiresIn: process.env.JWT_EXP})
        if(!token)
            return res.status(404).send('Token not generated')
        // console.log(token)

        // res.cookie('Token', token, { maxAge: parseInt(process.env.JWT_MAX_AGE)})
        res.cookie("Token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: parseInt(process.env.JWT_MAX_AGE)
        });


        const reply = {

            firstName: user.firstName,
            emailId: user.emailId,
            _id: user._id,
            role: user.role
        }
        
        res.status(200).json({
            user: reply,
            message : 'user created successfully'
        })
        
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}



const login = async (req, res)=>{

    try {

        // console.log('samir')
        
        const {emailId, password} = req.body

        if(!emailId || !password)
            throw new Error('Invalid credential')

        const user = await User.findOne({emailId})
        if(!user)
            return res.status(404).send('Invalid credentail')

        const match = await bcrypt.compare(password, user.password)
        // console.log(match)

        if(!match){
            return res.status(404).send('Invalid credential')
        }
    

        const reply = {
            firstName: user.firstName,
            emailId: user.emailId,
            _id: user._id,
            role: user.role
        }

        const token = jwt.sign({_id: user._id, emailId: emailId, role: user.role}, process.env.SECRET_KEY, {expiresIn: process.env.JWT_EXP})

        // res.cookie('Token', token, { maxAge: parseInt(process.env.JWT_MAX_AGE)})
        res.cookie("Token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: parseInt(process.env.JWT_MAX_AGE)
        });
        res.status(201).json({
            user: reply,
            message: 'Login successfully'
        })

    } catch (error) {
        // console.log(error.message)
        res.status(500).send(error.message)
    }
}



const logout = async (req, res)=>{

    try {

        const {Token} = req.cookies

        const payload = jwt.decode(Token)
        
        await redisClient.set(`Token: ${Token}`, 'Blocked')
        await redisClient.expireAt(`Token: ${Token}`, payload.exp)

        res.cookie('Token', null, {expires: new Date(Date.now())})

        res.status(201).send('Logged out successfully')
        
    } catch (error) {
        res.status(500).send("Internal server error")
    }
}



const adminRegister = async (req, res)=>{

    try {

        validate(req.body)

        const {emailId, password} = req.body

        if(!emailId || !password)
            return res.status(404).send('Email and password not Found')

        req.body.password = await bcrypt.hash(password, 10)
        // req.body.role = 'admin'

        const user = await User.create(req.body)
        if(!user)
            return res.status(404).send('User not found')

        // const Token = jwt.sign({_id: user._id, emailId: emailId, role: req.body.role}, process.env.SECRET_KEY, {expiresIn: process.env.JWT_EXP})
        res.cookie("Token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: parseInt(process.env.JWT_MAX_AGE)
        });
        if(!Token)
            throw new Error('Token not found')

        res.cookie('Token', Token)
        res.status(201).send(user.role+' Registered successully')

    } catch (error) {
        res.status(500).send(error.message)
    }

}



const deleteProfile = async (req, res)=>{

    try {
        
        const userId = req.user._id
        if(!userId)
            throw new Error('user id not found.')

        //from User schema
        await User.findByIdAndDelete(userId)

        //from Submission schema
        await Submission.deleteMany({userId})

        res.status(201).send('user deleted successfully')
    } catch (error) {
        
        res.status(500).send('Internal error')
    }
}


const validUser = async (req, res)=>{


    const reply = {
        firstName: req.user?.firstName,
        emailId: req.user.emailId,
        _id: req.user._id,
        role: req.user.role
    }

    res.status(200).json({
        user: reply,
        message: 'Valid user'
    })
}




const getProfile = async (req,res)=>{


    try {
        const _id = req.user._id
        const user = await User.findById(_id).select('firstName lastName emailId role createdAt').populate(
            {path: 'problemSolved', select: '_id title difficulty tags'},
            // {path: 'problemAttempted', select: '_id title difficulty tags'}
        )
        if(!user)
            return res.status(404).send('User not found')

        res.status(200).json({
            user,
            message: 'Profile found'
        })

    } catch (error) {
        res.status(500).send(error.message)
    }
    
}

module.exports = {register, login, logout, adminRegister, deleteProfile, validUser, getProfile}
