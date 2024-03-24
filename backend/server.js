// const express = require('express');

// now, we have changed the type into module, we 
import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js"
import connectToMongoDB from "./db/coonectToMongoDB.js";

import  globalErrorMiddleware  from "./controllers/error.controller.js";

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use(globalErrorMiddleware);

app.listen(port, () => {
    connectToMongoDB();
    console.log(`Server running on port ${port}`);
});

