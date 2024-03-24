// const express = require('express');

// now, we have changed the type into module, we 
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes.js"
import connectToMongoDB from "./db/coonectToMongoDB.js";

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World aa gya mai');
});

app.use("/api/auth", authRoutes);

app.listen(port, () => {
    connectToMongoDB();
    console.log(`Server running on port ${port}`);
});