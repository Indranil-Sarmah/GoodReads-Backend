exports.userSignupValidator = (req, res, next) => {
    req.check("name", "Name is required").notEmpty();
    req.check("email", "Email must be between 3 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Enter a valid Email-ID")
        .isLength({
            min: 4
        });
    req.check("password", "Password is required").notEmpty();
    req.check("password")
        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/) //regular expression for having atleast one digit/number
        .withMessage("Password must contain a number");
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0]; //map through all errors and display it one by one
        return res.status(400).json({ error: firstError });
    }
    next();
};