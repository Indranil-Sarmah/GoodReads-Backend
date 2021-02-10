const User = require("../models/user");

exports.signup = (req, res) => {
    
    console.log("req.body", req.body);//data coming from client side from user signup form
    const user = new User(req.body); //create new user
    user.save((err, user) => {  // save the newly user created
        if (err) {
            return res.status(400).json({ //if there is an error
                error
            });
        }
        res.json({
            user
        });
    });
};
