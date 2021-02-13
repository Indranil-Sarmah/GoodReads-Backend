const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
    let form = new formidable.IncomingForm(); //data coming from client side
    form.keepExtensions = true; //to keep jpg/png/svg formats
    form.parse(req, (err, fields, files) => { //parse the form data in req object
        if (err) { //in request object it might be error also , So we have to handle it also
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        let product = new Product(fields); //creating a product we got the feilds from the client side

        if (files.photo) {
            product.photo.data = fs.readFileSync(files.photo.path);//save the photo
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                return res.staus(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};