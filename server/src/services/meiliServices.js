const client = require("../config/meilisearch");
const Product = require("../models/Product");

const isEnabled = process.env.ENABLE_MEILISEARCH === "true";

const indexProduct = async (product) => {
    if(!isEnabled) return;
    
    const index = client.index("products");

    await index.addDocuments([
        {
            id: product._id.toString(),
            name: product.name,
            description: product.description,
            brand: product.brand,
            category: product.category,
            price: product.price,
            discountPrice: product.discountPrice,
            stock: product.stock,
        },
    ]);
};


const updateProduct = async (product) => {
    if(!isEnabled) return;
    const index = client.index("products");

    await index.addDocuments([
        {
            id: product._id.toString(),
            name: product.name,
            description: product.description,
            brand: product.brand,
            category: product.category,
            price: product.price,
            discountPrice: product.discountPrice,
            stock: product.stock,
        },
    ]);
};

const deleteProduct = async (productId) => {
    if(!isEnabled) return;
    const index = client.index("products");

    await index.deleteDocument(productId.toString());
};

const syncProductsToMeili = async () => {
    if(!isEnabled) return;
    
    const index = client.index("products");

    const products = await Product.find({ isActive: true }).lean();

    const documents = products.map((product) => ({
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        brand: product.brand,
        category: product.category,
        price: product.price,
        discountPrice: product.discountPrice,
        stock: product.stock,
    }));

    await index.addDocuments(documents);

    console.log(`${documents.length} products synced to Meilisearch.`);
};

const searchProducts = async (keyword) => {
    if(!isEnabled) {
        return [];
    }
    const index = client.index("products");

    const results = await index.search(keyword);

    return results.hits;
};

module.exports = {
    syncProductsToMeili,
    searchProducts,
    deleteProduct,
    updateProduct,
    indexProduct,
};