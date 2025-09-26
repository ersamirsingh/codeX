const express = require('express')
const authenticateUser = require('../Middleware/authenticateUser')
const submitRouter = express.Router()
const {submitCode, runCode} = require('../Controller/userSubmission')



submitRouter.post('/submit/:id', authenticateUser, submitCode)
submitRouter.post('/run/:id', authenticateUser, runCode)



module.exports = submitRouter
