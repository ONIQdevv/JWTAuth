require('dotenv').config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./routes/index")

const PORT = process.env.PORT || 5000;
const app = express();

app.use('/api', router);
app.use(cookieParser());
app.use(express.json());
app.use(cors());

const run = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewURLParser: true,
            useUnifiedTopology: true,

        })
        app.listen(PORT, () => console.log(`Server starts on PORT = ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}
run();