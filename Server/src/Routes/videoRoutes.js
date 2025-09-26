const express = require('express');
const authenticateAdmin = require('../Middleware/authenticateAdmin');
const videoRouter =  express.Router();
const {generateUploadSignature,saveVideoMetadata,deleteVideo} = require("../Controller/vidoSection")



videoRouter.get("/create/:problemId",authenticateAdmin,generateUploadSignature);
videoRouter.post("/save",authenticateAdmin,saveVideoMetadata);
videoRouter.delete("/delete/:problemId",authenticateAdmin,deleteVideo);




module.exports = videoRouter;