const User = require("../models/user");
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
        res.json({
            user        //if no error return the user in the response
        });
    });
};
