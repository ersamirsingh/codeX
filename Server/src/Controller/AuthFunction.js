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

        //Hash the password
        req.body.password = await bcrypt.hash(password, 10)
        req.body.role = 'user'

        //User creation
        const user = await User.create(req.body)

        if(!user)
            throw new Error('user not created- register')

        //JWT
        const token = jwt.sign({_id: user._id, emailId: emailId, role:"user"}, process.env.SECRET_KEY, {expiresIn: process.env.JWT_EXP})
        if(!token)
            throw new Error('Token not generated')
        // console.log(token)

        res.cookie('Token', token, { 
            httpOnly: true,      // not accessible by JS
            secure: true,        // only send over HTTPS
            sameSite: "None",    // required for cross-site cookies
            maxAge: parseInt(process.env.JWT_MAX_AGE)
        })

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
        res.status(400).send('Error occured: '+error.message)
    }
}



const login = async (req, res)=>{

    try {

        // console.log('samir')
        
        const {emailId, password} = req.body

        if(!emailId || !password)
            throw new Error('Invalid credential- Absent_data')

        const user = await User.findOne({emailId})
        if(!user)
            throw new Error('Invalid credentail- user not found')

        const match = await bcrypt.compare(password, user.password)
        // console.log(match)

        if(!match){
            throw new Error('Invalid credential- Match')
        }

        const reply = {
            firstName: user.firstName,
            emailId: user.emailId,
            _id: user._id,
            role: user.role
        }

        const token = jwt.sign({_id: user._id, emailId: emailId, role: user.role}, process.env.SECRET_KEY, {expiresIn: process.env.JWT_EXP})

        res.cookie('Token', token, { 
            httpOnly: true,      // not accessible by JS
            secure: true,        // only send over HTTPS
            sameSite: "None",    // required for cross-site cookies
            maxAge: parseInt(process.env.JWT_MAX_AGE)
        })
        res.status(201).json({
            user: reply,
            message: 'Login successfully'
        })

    } catch (error) {
        // console.log(error.message)
        res.status(401).send('Error occured: '+error.message)
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
        res.status(503).send('Error occoured '+error.message)
    }
}



const adminRegister = async (req, res)=>{

    try {

        validate(req.body)

        const {emailId, password} = req.body

        if(!emailId || !password)
            throw new Error('Email and password not Found- Admin register')

        req.body.password = await bcrypt.hash(password, 10)
        // req.body.role = 'admin'

        const user = await User.create(req.body)
        if(!user)
            throw new Error('User not found')

        const Token = jwt.sign({_id: user._id, emailId: emailId, role: req.body.role}, process.env.SECRET_KEY, {expiresIn: process.env.JWT_EXP})
        if(!Token)
            throw new Error('Token not found- Admin register')

        res.cookie('Token', token, { 
            httpOnly: true,      // not accessible by JS
            secure: true,        // only send over HTTPS
            sameSite: "None",    // required for cross-site cookies
            maxAge: parseInt(process.env.JWT_MAX_AGE)
        })
        
        res.status(201).send(user.role+' Registered successully')

    } catch (error) {
        res.send('Error occured '+error.message)
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

        res.status(201).send('user Deleted successfully')
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


module.exports = {register, login, logout, adminRegister, deleteProfile, validUser}
