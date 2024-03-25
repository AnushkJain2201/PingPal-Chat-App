// const express = require('express');

// now, we have changed the type into module, we have to import not require
import path from 'path';
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import cors from 'cors';  


import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";

import globalErrorMiddleware from "./controllers/error.controller.js";
import { app, server } from "./socket/socket.js";


const port = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json());
app.use(cookieParser()); //to parse the cookie

// app.use(cors());


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.use(globalErrorMiddleware);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(port, () => {
    connectToMongoDB();
    console.log(`Server running on port ${port}`);
});

