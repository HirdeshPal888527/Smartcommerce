const redisService = require("./redisServices");

const cacheOrFetch = async (key, fetchFunction, ttl = 300) => {
    const cachedData = await redisService.get(key);

    if (cachedData) {
        console.log(`✅ Cache HIT: ${key}`);
        return {
            data: JSON.parse(cachedData),
            cache: "HIT",
        };
    }

    console.log(`❌ Cache MISS: ${key}`);

    const data = await fetchFunction();

    await redisService.set(key, data, ttl);

    return {
        data,
        cache: "MISS",
    };
};

module.exports = {
    cacheOrFetch,
};