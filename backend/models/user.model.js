import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "One must enter their full name"]
    },

    username: {
        type: String,
        required: [true, "One must enter their username"],
        unique: true
    },

    password: {
        type: String,
        required: [true, "neccesary to enter password"],
        minlength: 6
    },

    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },

    profilePic: {
        type: String,
        default: ""
    }

}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;