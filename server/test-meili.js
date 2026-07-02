require("dotenv").config();

const client = require("./src/config/meilisearch");

async function test() {
    const health = await client.health();
    console.log(health);
}

test();