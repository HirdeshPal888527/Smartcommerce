const generateTokenAndSetCookie= require("../utils/generateToken");
const bcrypt=require("bcryptjs");


const User= require("../models/User");
const asyncHandler=require("../utils/asyncHandler");
const AppError= require("../utils/AppError");

const registerUser = asyncHandler(async (req,res) =>  {
        const{name,email,password,role}=req.body;

        const existingUser= await User.findOne({email});

        if(existingUser){
            throw new AppError("Email already registered.",400);
        }


        const hashedPassword = await bcrypt.hash(password,10);
        const user= await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        generateTokenAndSetCookie(user,res);
        
        return res.status(201).json({
            success:true,
            message:"User is registered successfully.",
            user:{
                id: user._id,
                name: user.name,
                email:user.email,
                role:user.role
            }
        });
});

const loginUser= asyncHandler(async (req,res) => {
        const{email,password}=req.body;
        const user = await User.findOne({ email});
        if(!user){
            throw new AppError("Invalid email or password",401);
        }
        const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
        );
        if(!isPasswordMatched){
            throw new AppError("Invalid email or password",401);
        }
        generateTokenAndSetCookie(user,res);
        return res.status(200).json({
            success: true,
            message: "Login successful.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
});

module.exports={
    registerUser,
    loginUser,
};