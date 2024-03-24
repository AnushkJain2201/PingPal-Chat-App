import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import AppError from "../utils/appError.js";

export const signup = async (req, res, next) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return next(new AppError("Passwords Do Not Match", 401));
        }

        const user = await User.findOne({username});

        if(user) {
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

        res.status(201).json({
            status: 'success',
            data:{
                newUser,
            }
        });

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const login = (req, res) => {
    console.log('Login user')
}

export const logout = (req, res) => {
    console.log('Logout user')
}

