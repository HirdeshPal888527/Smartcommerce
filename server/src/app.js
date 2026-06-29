const express = require("express");
const cookieParser= require("cookie-parser");

const authRoutes = require("./routes/authRoutes");

const app = express();



app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "SmartCommerce API is running 🚀"
    });
});

app.use("/api/auth",authRoutes);

module.exports = app;