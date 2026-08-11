import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import sendEmail from "../utils/sendEmail.js";



const registerUser = async (req, res) => {
    
    try {

        const { username, email, password } = req.body;
    
        if (
            !username?.trim() ||
            !email?.trim() ||
            !password?.trim()
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
    
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });
    
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });
        try {
            await sendEmail(
                user.email,
                "Welcome to Our Website",
                `
                    <h1>Hello ${user.username}</h1>
                    <p>Your account has been created successfully.</p>
                `
            );
        } catch (error) {
            console.error("Email Error:", error.message);
           
            
         }
    
        const createdUser = await User.findById(user._id)
            .select("-password");
    
        return res.status(201).json({
            message: "User registered successfully",
            user: createdUser
        });
    
    } catch (error) {
    
        return res.status(500).json({
            message: error.message
        });
    
    }
};



const loginUser= async(req,res)=>{
  try{
    const {email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(409).json({
            message: "Invalid email or password"
        });
    }
    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }
   

    //Jwt token 
     const token = jwt.sign(
        {
            _id: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
         }
     )
     res.cookie("accessToken", token, {
        httpOnly: true,
        secure: true
    });
    return res.status(200).json({
        message: "User logged in successfully",
        token,
        user: {
            _id: user._id,
            username: user.username,
            email: user.email
        }
    });

    

  }catch(err){
    console.log(err);
    
  }
}

const getCurrentUser = async (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user
    });
};

const logoutUser = async (req, res) => {
    return res
    .clearCookie("accessToken")
    .status(200)
    .json({
        message: "User logged out successfully"
    });
}




export { registerUser,loginUser,getCurrentUser,logoutUser };