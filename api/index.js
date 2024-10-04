import express, { json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';

dotenv.config();



mongoose.connect(process.env.MONGO_STR).then(()=>{
    console.log('Database connected');
}).catch((err)=>{
    console.log(err);
})


const app=express();
app.use(express.json());


app.listen(3002,()=>{
    console.log('Server is running on port 3000');
})
 

app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);