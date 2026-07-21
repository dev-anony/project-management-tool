import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => { 
    const token = jwt.sign({ id: userId },
         process.env.JWT_SECRET, { expiresIn: "24h" });


    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", //csrf
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    });
}

export default generateTokenAndSetCookie;