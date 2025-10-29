const express = require('express')
const authRouter = express.Router()
const {register, login, logout, adminRegister, deleteProfile, validUser, getProfile} = require('../Controller/AuthFunction')
const authenticateUser = require('../Middleware/authenticateUser')
const authenticateAdmin = require('../Middleware/authenticateAdmin')



authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', authenticateUser, logout)
authRouter.post('/admin/register', authenticateAdmin, adminRegister)
authRouter.delete('/deleteProfile', authenticateUser, deleteProfile)
authRouter.get('/check', authenticateUser, validUser)
authRouter.get('/profile', authenticateUser, getProfile)


module.exports = authRouter