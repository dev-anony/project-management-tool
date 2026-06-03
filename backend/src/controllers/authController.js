import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

export async function signup(req, res) {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide name, email, and password" });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); // Simple 6-digit token

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationExpires: Date.now() + 24 * 60 * 60 * 1000, // Token valid for 1 hour
        });

        await newUser.save();

        //jwt 
        generateTokenAndSetCookie(newUser._id, res); 

        res.status(201).json({ success: true, message: "User registered successfully", user: {
            ...newUser._doc,
            password: undefined, // Exclude password from response
            verificationToken: undefined, // Exclude verification token from response
        } });

    }
    catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ success: false, message: "Server error during signup" });
    }
}
export async function login(req, res) {
    res.send("Login route");
}

export async function logout(req, res) {
    res.send("Logout route");
}

