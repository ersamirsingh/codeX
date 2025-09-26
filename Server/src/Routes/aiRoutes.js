const express = require('express')
const authenticateUser = require('../Middleware/authenticateUser')
const solveDoubt = require('../Controller/solveDoubt')
const aiRouter = express.Router()



aiRouter.post('/chat', authenticateUser, solveDoubt)



module.exports = aiRouter