import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import {errorHandler} from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const signup= async (req,res,next, )=>{
   const {username,email,password} = req.body;

   if(!username||!email||!password||username===''||email===''||password===''){
        next(errorHandler(400,"All fields are required"))
   }
   const hashpassword= bcrypt.hashSync(password,10)
   
   const newUser= new User({username,email,password:hashpassword})
   
   try{
        await newUser.save();

        res.json({message:"Signup successful"})
    }
    catch(err){
        next(err)
    }
   
}

export const signin= async (req,res,next)=>{
    const {email,password} = req.body;

    if(!email||!password||email===''||password===''){
        next(errorHandler(400,"All fields are required"))
    }

    try{
        const validUser= await User.findOne({email})

        if(!validUser){
           return next(errorHandler(404,"User not found"))
        }

        const isMatch= bcrypt.compareSync(password,validUser.password)

        if(!isMatch){
           return next(errorHandler(400,"Invalid password"))
        }

        const token= jwt.sign({id:validUser._id},process.env.JWT_SECRET,{expiresIn:'1d'})

        const {password:pass,...rest}=validUser._doc

        res.status(200).cookie('token',token,{httpOnly:true}).json(rest)
    }
    catch(err){
        next(err)
    }
}