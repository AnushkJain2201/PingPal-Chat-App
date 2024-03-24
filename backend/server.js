// const express = require('express');

// now, we have changed the type into module, we 
import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World aa gya mai');
});

app.listen(port, () => console.log(`Server running on port ${port}`));