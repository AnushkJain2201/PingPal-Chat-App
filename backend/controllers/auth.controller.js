import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = catchAsync(async (req, res, next) => {

    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
        return next(new AppError("Passwords Do Not Match", 400));
    }

    const user = await User.findOne({ username });

    if (user) {
        return next(new AppError("Username already exists", 400));
    }

    // Hashing Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // generating profile pics
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await User.create({
        fullName,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
    });

    const token = generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
        status: 'success',
        data: {
            newUser,
            token
        }
    });


});

export const login = catchAsync(async (req, res, next) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return next(new AppError('Please provide username and password!', 400));
    }

    const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if(!user || !isPasswordCorrect) {
        return next(new AppError("Incoorect password or username", 400));
    }

    const token = generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
        status: "success",
        data: {
            user,
            token

        }
    })
});

export const logout = catchAsync(async (req, res, next) => {
    res.cookie("jwt", "", {maxAge: 0});
    res.status(200).json({
        status: "success",
        message: "Logged out successfully"
    });
});

