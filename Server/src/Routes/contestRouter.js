const express = require("express");
const { createContest, getAllContests, updateContest, deleteContest, registerForContest } = require('../Controller/ContestFunction.js')
const authenticateAdmin = require("../Middleware/authenticateAdmin.js");
const authenticateUser = require('../Middleware/authenticateUser.js')



const contestRouter = express.Router();

// ✅ Contest routes

contestRouter.get("/", authenticateUser, getAllContests);
contestRouter.post("/:id/register", authenticateUser, registerForContest);

contestRouter.post("/create", authenticateAdmin, createContest);
contestRouter.put("/:id", authenticateAdmin, updateContest);
contestRouter.delete("/:id", authenticateAdmin, deleteContest);



module.exports = contestRouter
