const express = require("express");
const cookieParser= require("cookie-parser");

const adminRoutes = require("./routes/adminRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const cartRoutes = require("./routes/cartRoutes");
const uploadRoutes= require("./routes/uploadRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");


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
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/admin", adminRoutes);



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