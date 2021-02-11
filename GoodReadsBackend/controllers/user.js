const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check

const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = (req, res) => {
    
    console.log("req.body", req.body);//data coming from client side from user signup form
    const user = new User(req.body); //create new user
    user.save((err, user) => {  // save the newly user created
        if (err) {
            return res.status(400).json({ //if there is an error
                error: errorHandler(err)// display a friendly error message in the errorHandler
            });
        }
        //before sending the response to the user making sure that some important credentials are not exposed
        user.salt = undefined;
        user.hashed_password = undefined;

        res.json({
            
            user        //if no error return the user in the response
        });
    });
};

exports.signin = (req, res) => {
    // find the user based on email
    const { email, password } = req.body; //findOne is a function in mongodb which is used to find a particular user from the database
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User with that email does not exist. Please signup"
            });
        }
        // if user is found make sure the email and password match
        // create authenticate method in user model
        if (!user.authenticate(password)) {
            return res.status(401).json({ //401 is unauthorized
                error: "Email and password dont match"
            });
        }
        // generate a signed token with user id and secret, by using sign method in jwt
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie("t", token, { expire: new Date() + 9999 });
        // return response with user and token to frontend client
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role } });
    });
};

exports.signout = (req, res) => {
    res.clearCookie("t"); //just clear the cookie of signed in user 
    res.json({ message: "Signout success" }); //display a sucessful signout message
};

//protect any routes we can use this require signin method
//if any user try to access protected routes then they will get unauthorized access error
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms:["HS256"],
    userProperty: "auth"
});
