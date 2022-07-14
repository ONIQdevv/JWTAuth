require('dotenv').config() // .env config import
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser') // There will be Session Storage
const mongoose = require('mongoose'); // Database include
const router = require('./router/router')
const errorMiddleware = require('./middleware/error'); // Error controller

const PORT = process.env.PORT || 5000;
const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
    credentials: true,
    origin: process.env.CLIENT_URL
    })
);

app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`Server working on PORT = ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start()
