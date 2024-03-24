import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    message: {
        type: String,
        required: true
    }

    // createdAt and updatedAt fields are created automatically due to timestamps field
}, {timestamps: true});

// messageSchema.pre(/^find/, function (next) {
//     this.populate({
//         // here we can select the fields that we want to populate if we don't want that we will just write 'guides' in the populate function, and that will get all the fields
//         path: 'senderId',

//         // here, we are deselecting the __v and passwordChangedAt field
//         select: '_id fullName'
//     }).populate({
//         path: 'receiverId',

//         // here, we are deselecting the __v and passwordChangedAt field
//         select: '_id fullName'
//     });

//     next();
// });


const Message = mongoose.model("Message", messageSchema);

export default Message;