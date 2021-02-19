const express = require("express");
const router = express.Router();

const { requireSignin,isAuth,isAdmin } = require("../controllers/auth");
const { userById,read,update } = require("../controllers/user");

//this method will fetch the userID from the URL if it contains usedID Routes-- from this userID we can particularly show the details of the user as per our requirement
router.get("/secret/:userId", requireSignin,isAuth,isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});

//comment
router.get("/user/:userId", requireSignin, isAuth, read);
router.put("/user/:userId", requireSignin, isAuth, update);

router.param("userId", userById);

module.exports = router;