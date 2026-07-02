const { Meilisearch } = require("meilisearch");

const client = new Meilisearch({
    host: process.env.MEILISEARCH_HOST,
    apiKey: process.env.MEILISEARCH_API_KEY,
});

module.exports = client;