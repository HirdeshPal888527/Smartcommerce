const express= require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const authorize= require("../middlewares/roleMiddleware");

const{
    createProduct,
    getAllProducts,
    getProductById,
    UpdateProduct,
    deleteProduct,
}= require("../controllers/productController");


router.get("/",getAllProducts);
router.get("/:id",getProductById);
router.put(
    "/:id",
    protect,
    authorize("seller","admin"),
    UpdateProduct
);
router.post(
    "/",
    protect,
    authorize("seller","admin"),
    createProduct
);
router.delete(
    "/:id",
    protect,
    authorize("seller","admin"),
    deleteProduct
);


module.exports= router;