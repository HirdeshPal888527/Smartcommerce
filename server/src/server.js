require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const { connectRedis } = require("./config/redis");


const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Connect Database
        await connectDB();

        await connectRedis();

        // Start Express
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

startServer();