const crypto = require("crypto");

const processPayment = async (amount) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const transactionId = `txn_${crypto.randomBytes(8).toString("hex")}`;

    return {
        success: true,
        transactionId,
        amount,
        status: "Paid",
        paidAt: new Date(),
    };
};

module.exports = {
    processPayment,
};