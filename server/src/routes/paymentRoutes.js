const express = require("express");

const paymentController = require("../controllers/paymentController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/:orderId", protect, paymentController.payOrder);

module.exports = router;