const mongoose = require("mongoose");
const crypto = require("crypto");//core node.js module to encrypt the password
const { v4: uuidv4 } = require('uuid');//unique strings for userId 



//to create a schema in mongoDB
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        hashed_password: {
            type: String,
            required: true
        },
        about: {
            type: String,
            trim: true
        },
        salt: String,
        role: {
            type: Number,
            default: 0
        },
        history: {
            type: Array,
            default: []
        }
    },
    { timestamps: true }
);

// virtual field
userSchema
    .virtual("password")
    .set(function(password) {
        this._password = password;
        this.salt = uuidv4();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

    // add methods in mongoose to perform some action
userSchema.methods = {
    encryptPassword: function(password) {
        if (!password) return "";
        try {
            //crypto has this inbuilt function,refer nodejs documentation 
            return crypto
                .createHmac("sha1", this.salt)//salt is a long complicated unique string
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    }
};

//finally exporting the schema by creating the model using model method of mongoose
module.exports = mongoose.model("User", userSchema);

//body-parser : is used to parse the data coming from client side and req object
