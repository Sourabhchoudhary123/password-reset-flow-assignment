import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const register = async (req, res) => {

    const { names, email, password, confirmPassword } = req.body;

    if (!names || !email || !password || !confirmPassword) {
        res.status(400).json({ message: "All field are mandatory" })
    }

    if (password !== confirmPassword) {
        res.status(400).json({ message: "confirmPassword not matched" })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
        names,
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


    res.json({ message: "Login Success", token });

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

    const link = `${process.env.CLIENT_URL}/reset-password/${token}`;

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