import userModel from "../../../DB/model/user.model.js";
import bcrypt from 'bcryptjs'
import cloudinary from "../../services/cloudinary.js";
import jwt, { decode } from "jsonwebtoken";
import sendEmail from "../../services/email.js";
import { customAlphabet, nanoid } from "nanoid";

export const signUp = async (req, res) => {
    const { userName, email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
        return res.status(409).json({ message: "email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND));

    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
        folder: `${process.env.APP_Name}/users`,
    });
    const token = jwt.sign({ email }, process.env.EMAIL_CONFIRM_KEY);
    await sendEmail(email, 'Confirm Email', `<a href='${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}'>verify</a>`);

    const createUser = await userModel.create({ userName, email, password: hashedPassword, image: { secure_url, public_id } });

    return res.status(201).json({ message: "success", createUser });
}

export const confirmEmail = async (req, res) => {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.EMAIL_CONFIRM_KEY);
    if (!decoded) {
        return res.status(400).json({ message: "invalid token" });
    }
    const user = await userModel.findOneAndUpdate({ email: decoded.email, confirmEmail: false }, { confirmEmail: true });
    if (!user) {
        return res.status(404).json({ message: "not verified or your email is already verified" });
    }
    // return res.redirect(process.env.LOGIN_FRONTEND);
    return res.status(200).json({ message: "your email is verified" });
}

export const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "email not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ message: "data invalid" });
    }
    const token = jwt.sign({ id: user._id, role: user.role, status: user.status }, process.env.LOGIN_SECRET/*, { expiresIn: '30m' }*/);
    const refreshToken = jwt.sign({ id: user._id, role: user.role, status: user.status }, process.env.LOGIN_SECRET,
        { expiresIn: 60 * 60 * 24 * 30 });
    return res.status(200).json({ message: "success", token, refreshToken });
}

export const sendCode = async (req, res) => {
    const { email } = req.body;
    if (!await userModel.findOne({ email })) {
        return res.status(404).json({ message: "Invalid email" });
    }

    let code = customAlphabet('1234567890ABCDabcd', 5);
    code = code();
    const user = await userModel.findOneAndUpdate({ email }, { sendCode: code }, { new: true });
    const html = `<h2>code is: ${code} </h2>`;
    await sendEmail(email, "Reset Password", html);
    // return res.redirect(process.env.FORGET_PASSWORD_URL); // (to the page forgetPassword)
    return res.status(200).json({ message: "success", user });
}

export const forgetPassword = async (req, res) => {
    const { email, password, code } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "not register account" });
    }
    if (user.sendCode != code) {
        return res.status(404).json({ message: "invalid code" });
    }
    let match = bcrypt.compareSync(password, user.password);
    if (match) {
        return res.status(409).json({ message: "The same password, rejected" });
    }
    user.password = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND));
    user.sendCode = null;
    await user.save();
    return res.status(201).json({ message: "success" });
    //can be redirect to loginPage...
}