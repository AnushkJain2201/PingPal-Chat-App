import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
import User from "../models/user.model.js";

const protectRoute = catchAsync(async (req, res, next) => {

    const token = req.cookies.jwt;
    if (!token) {
        return next(new AppError("Unauthorized - No token provided", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
        return next(new AppError("Unauthorized - Invalid token", 401));
    }

    const user = await User.findById(decoded.userId).select("-password");

    if(!user) {
        return next(new AppError("User not found", 404));
    }

    req.user = user;

    next();

});

export default protectRoute;