const express = require("express");
const router = express.Router();

const { create, productById, read,remove,update,list,listRelated,listCategories } = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
    "/product/:productId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);

router.put(
    "/product/:productId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);

router.get("/products", list);//list all the products according to sold,newarival
router.get("/products/related/:productId", listRelated);//to display related products
router.get("/products/categories", listCategories);//ti list product categories


//whenever there is a id in the routes there the methods will run
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
