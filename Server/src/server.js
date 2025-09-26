const express = require('express')
const app = express()
require('dotenv').config()
const main = require('./Config/MongoDB')
const cookieParser = require('cookie-parser')
const authRouter = require('./Routes/authRoutes')
const redisClient = require('./Config/RedisDB')
const problemRouter = require('./Routes/problemRoutes')
const submitRouter = require('./Routes/submitRoutes')
const cors = require('cors')
const aiRouter = require('./Routes/aiRoutes')
const videoRouter = require('./Routes/videoRoutes')
const contestRouter = require('./Routes/contestRouter')




//CORS parsing
app.use(cors({
  origin: "https://codex-fronted.onrender.com", // frontend URL
  credentials: true // allow cookies/auth headers
}));

//Parsing
app.use(express.json())
app.use(cookieParser())


app.get("/", (req, res) => {
  res.send("Backend is running! Visit /user/login or /user/check, and more");
});


//Route
app.use('/user', authRouter)
app.use('/problem', problemRouter)
app.use('/submission', submitRouter)
app.use('/ai', aiRouter)
app.use("/video", videoRouter);
app.use('/contest', contestRouter)



const InitalizeConnection = async ()=>{

    try {
        // console.log('samir')
        await Promise.all([redisClient.connect(), main()])
        console.log('DB connected successfully')

        
        app.listen(process.env.PORT, ()=>{
            console.log('Listening at port '+process.env.PORT)
        })

    } catch (error) {
        console.log('Error: '+error)
        
    }
}

InitalizeConnection()
