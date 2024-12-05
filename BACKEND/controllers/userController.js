import userModel from "../models/userModel.js";
import jwt from'jsonwebtoken'
import validator from 'validator'
import bcrypt from 'bcrypt'

//login user
const loginUser = async(req,res)=>{
    const {email,password} = req.body
    try{
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).json({success:false, message:'User not found'})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({success:false, message:'Invalid password'})
        }
        const token = createToken(user._id);
        res.json({success:true,token})
    }
    catch(error){
        console.log(error)
        res.json({success:false, message:"Error"})
    }

}

//jwt token 
const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// register user
const registerUser = async(req,res)=>{
    const {name, password, email} = req.body;
    try{
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success: false,message: 'Email already exists'});
            }
        if(!validator.isEmail(email)){
            return res.json({success: false,message: 'Invalid email'});
        }
        if(password.length < 8){
            return res.json({success: false,message: 'Password must be at least 8 characters long'})
        }
        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })
        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({success:true, token})
    }
    catch(error){
        console.log(error);
        
        res.json({success:false, message:"Error"})
        
    }
}

export {loginUser,registerUser}