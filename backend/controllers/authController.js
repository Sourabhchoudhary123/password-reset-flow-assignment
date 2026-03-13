import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {

    const { name, email, password, confirmPassword } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hash,
        confirmPassword

    });

    await user.save();

    res.json({ message: "User Registered" });
};

export const login = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.json({ message: "Wrong Password" });




    // JWT TOKEN
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );


    res.json({ message: "Login Success",token });

    console.log("JWT_SECRET:", process.env.JWT_SECRET);

};

export const forgotPassword = async (req, res) => {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 600000;

    await user.save();

    const link = `http://localhost:5173/reset-password/${token}`;

    await sendEmail(email, link);

    res.json({ message: "Reset link sent" });
};

export const resetPassword = async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
        resetToken: token,
        resetTokenExpire: { $gt: Date.now() }
    });

    if (!user) return res.json({ message: "Invalid or expired token" });

    const hash = await bcrypt.hash(password, 10);

    user.password = hash;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.json({ message: "Password updated" });
};

export const registers = async (req, res) => {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    const user = new User({
        name,
        email,
        password
    });

    await user.save();

    res.json({
        message: "User registered successfully",

    });

}