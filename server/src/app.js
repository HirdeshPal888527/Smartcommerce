const express = require("express");
const cookieParser= require("cookie-parser");

const cartRoutes = require("./routes/cartRoutes");
const uploadRoutes= require("./routes/uploadRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");



const errorMiddleware=require("./middlewares/errorMiddleware")
const protect=require("./middlewares/authMiddleware");

const app = express();



app.use(express.json());
app.use(cookieParser());


app.use("/api/products",productRoutes);
app.use("/api/upload",uploadRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/orders",orderRoutes);



app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "SmartCommerce API is running 🚀"
    });
});
app.get("/api/profile",protect,(req,res)=>{
    res.json({
        success: true,
        user: req.user,
    });
});

app.use(errorMiddleware);


module.exports = app;