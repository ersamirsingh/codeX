const express = require('express')
const problemRouter = express.Router()
const authenticateAdmin = require('../Middleware/authenticateAdmin')
const {createProblem, updateProblem, deleteProblem, getProblemById, getAllProblem, solvedProblemByUser, submittedProblem} = require('../Controller/ProblemFunction')
const authenticateUser = require('../Middleware/authenticateUser')


//create
//Delete
//Update
//delete


//Need of an Admin access
problemRouter.post('/create', authenticateAdmin, createProblem)
problemRouter.put('/update/:id', authenticateAdmin, updateProblem)
problemRouter.delete('/delete/:id', authenticateAdmin, deleteProblem)


//user authentication only
problemRouter.get('/problemById/:id', authenticateUser, getProblemById)
problemRouter.get('/getAllProblem', authenticateUser, getAllProblem)
problemRouter.get('/problemSolvedByUser', authenticateUser, solvedProblemByUser)
problemRouter.get('/submittedProblem/:pid', authenticateUser, submittedProblem)



module.exports = problemRouter