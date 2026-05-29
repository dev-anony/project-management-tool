import User from "../models/Users.js";
import bcrypt from "bcryptjs";



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

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ success: true, message: "User registered successfully" });
        
    }
    catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ success: false, message: "Server error during signup" });
    }

    res.send("Signup route");
}
export async function login(req, res) {
    res.send("Login route");
}

export async function logout(req, res) {
    res.send("Logout route");
}

