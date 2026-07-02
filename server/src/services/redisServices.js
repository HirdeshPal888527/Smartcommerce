const { client } = require("../config/redis");

const get = async (key) => {
    return await client.get(key);
};

const set = async (key, value, ttl = 300) => {
    await client.set(
        key,
        JSON.stringify(value),
        {
            EX: ttl,
        }
    );
};

const del = async (key) => {
    await client.del(key);
};

const delByPattern = async (pattern) => {
    const keys = await client.keys(pattern);

    if (keys.length > 0) {
        await client.del(keys);
    }
};

module.exports = {
    get,
    set,
    del,
    delByPattern,
};