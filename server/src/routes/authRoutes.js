const express= require("express");

const router = express.Router();
const protect = require("../middlewares/authMiddleware");


const{registerUser,loginUser,logoutUser,getCurrentUser}=require("../controllers/authController");
router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);
router.get("/me", protect, getCurrentUser);
module.exports=router;