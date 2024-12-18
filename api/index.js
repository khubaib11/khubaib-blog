import express, { json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
// import cors from 'cors';

dotenv.config();


mongoose.connect(process.env.MONGO_STR).then(()=>{
    console.log('Database connected');
}).catch((err)=>{
    console.log(err);
})


const app=express();
app.use(express.json());

// app.use(cors());

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})
 

app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success:false,
        message,
        statusCode
    });

})