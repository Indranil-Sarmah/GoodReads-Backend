const express = require("express");
const mongoose = require('mongoose');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
require("dotenv").config();
const userRoutes = require("./routes/user");

const URL = process.env.MONGO_URI;
mongoose.connect(URL,{ useNewUrlParser: true }).then(()=>
    console.log('DB connected')
);

mongoose.connection.on('error',err=>{
    console.log(`DB connection error : ${err.message}`);
});

//middlewares
app.use(morgan("dev"));//we can see the response we are getting from the server
app.use(bodyParser.json());
app.use(cookieParser()); //for saving user credentials in the cookie


// routes middleware
app.use("/api", userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
