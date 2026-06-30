const generateTokenAndSetCookie= require("../utils/generateToken");
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
        })


    } catch(error){
        console.error(error);
        
        return res.status(500).json({
            success: false,
            message:"Internal Sever Error"
        });
    }

    
};

const loginUser= async (req,res) => {
    try{
        const{email,password}=req.body;
        const user = await User.findOne({ email});
        if(!user){
            return res.status(401).json({
                success:false,
                message: "Invalid email or password",
            });
        }
        const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
        );
        if(!isPasswordMatched){
            return res.status(401).json({
                success:false,
                message: "Invalid email or password",
            });
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
    
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message: "Internal Server Error",
        });
    }
};

module.exports={
    registerUser,
    loginUser,
};