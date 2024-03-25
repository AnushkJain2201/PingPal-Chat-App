import { catchAsync } from "../utils/catchAsync.js";
import Conversation from "./../models/conversation.model.js"
import Message from "./../models/message.model.js"

export const sendMessage = catchAsync(async (req, res, next) => {
    const {message} = req.body;
    const {id: receiverId} = req.params;
    const senderId = req.user._id;

    // This will find the conversation between these two ids $all is a mongoose operator to find something in all array
    let conversation = await Conversation.findOne({
        participants: {$all: [senderId, receiverId]}
    });

    // If the conversation is starting for the very first time
    if(!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId],
        })
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        message
    });

    if(newMessage) {
        conversation.messages.push(newMessage._id);
    }

    // SOCKET IO Functionality will go here

    await Promise.all([conversation.save(), newMessage.save()]);


    res.status(201).json(newMessage);

});

export const getMessages = catchAsync(async (req, res, next) => {
    const {id: userToChatId} = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
        participants: {$all: [senderId, userToChatId]}
    }).populate("messages");

    if(!conversation) {
        return res.status(200).json([]);
    }

    const messages = conversation.messages;

    res.status(200).json(messages);
});