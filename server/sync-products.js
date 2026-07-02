require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("./src/config/db");
const { syncProductsToMeili } = require("./src/services/meiliServices");

async function run() {
    try {
        await connectDB();

        await syncProductsToMeili();

        console.log("Sync completed.");

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

run();