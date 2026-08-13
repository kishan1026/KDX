import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";


// ================= REGISTER =================

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (
            !username?.trim() ||
            !email?.trim() ||
            !password
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const cleanUsername = username.trim();
        const cleanEmail = email.trim().toLowerCase();

        // Check existing user
        const existingUser = await User.findOne({
            $or: [
                { email: cleanEmail },
                { username: cleanUsername }
            ]
        }).lean();

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        // Create user
        const user = await User.create({
            username: cleanUsername,
            email: cleanEmail,
            password: hashedPassword
        });

        // Send response immediately
        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });

        // Send email AFTER response
        // This prevents email service from delaying registration.
        sendEmail(
            user.email,
            "Welcome to KDX",
            `
                <h1>Hello ${user.username}</h1>
                <p>Your KDX account has been created successfully.</p>
            `
        ).catch((error) => {
            console.error(
                "Welcome Email Error:",
                error.message
            );
        });

    } catch (error) {
        console.error("Register Error:", error);

        return res.status(500).json({
            message: "Registration failed"
        });
    }
};


// ================= LOGIN =================

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email?.trim() || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const cleanEmail = email.trim().toLowerCase();

        // Find user
        const user = await User.findOne({
            email: cleanEmail
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isPasswordCorrect =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                _id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // Set cookie
        res.cookie(
            "accessToken",
            token,
            {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                path: "/",
                maxAge: 24 * 60 * 60 * 1000
            }
        );

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            message: "Login failed"
        });
    }
};


// ================= CURRENT USER =================

const getCurrentUser = async (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user
    });
};


// ================= LOGOUT =================

const logoutUser = async (req, res) => {
    return res
        .clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/"
        })
        .status(200)
        .json({
            message: "User logged out successfully"
        });
};


export {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser
};