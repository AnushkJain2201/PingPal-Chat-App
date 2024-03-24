import User from "../models/user.model.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getUsersForSidebar = catchAsync(async (req, res, next) => {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json({
        status: 'success',
        results: filteredUsers.length,
        data: {
            users: filteredUsers
        }
    })
})