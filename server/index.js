import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'
import planRoutes from './routes/Plan.js'
import postRoute from './routes/Post.js'
import addRoute from './routes/addFrnd.js'
import {remRoute} from './routes/addFrnd.js'

const app=express();
dotenv.config();
app.use(express.json({limit:'30mb', extended:true}))
app.use(express.urlencoded({limit:'30mb', extended:true}))
app.use(cors());

app.get('/',(req,res)=>{
    res.send("This is Stack Overflow clone API")
})

app.use('/user', userRoutes)
app.use('/questions', questionRoutes)
app.use('/answer', answerRoutes)
app.use('/plan', planRoutes)
app.use('/post', postRoute)
app.use('/add', addRoute)
app.use('/remove', remRoute)

const PORT = process.env.PORT || 5000;

const CONNECTION_URL = "mongodb+srv://admin:admin123@cluster0.fib62yx.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT,() =>{console.log('server running on port $(PORT)')} ))
    .catch((err) => console.log(err.message))
