const jwt= require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const User= require("../models/User");

const registerUser = async (req,res) =>  {
    try{
        const{name,email,password,role}=req.body;

        const existingUser= await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success: false,
                message:"Email already registered."
            });
        }


        const hashedPassword = await bcrypt.hash(password,10);
        const user= await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        const token=jwt.sign(
            {
                userId: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN,
            }
        );
        res.cookie("token",token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:"lax",
            maxAge: 7*24*60*60*1000,
        });
        return res.status(201).json({
            success:true,
            message:"User is registered successfully.",
            user:{
                id: user._id,
                name: user.name,
                email:user.email,
                role:user.role
            }
        })


    } catch(error){
        console.error(error);
        
        return res.status(500).json({
            success: false,
            message:"Internal Sever Error"
        });
    }

    
};

module.exports={
    registerUser
};