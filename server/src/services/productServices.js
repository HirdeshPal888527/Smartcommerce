const Product= require("../models/Product");
const meiliService = require("./meiliServices");
const redisService = require("./redisServices");
const { cacheOrFetch } = require("./cacheServices");


const createProduct= async(productData)=>{
    const product= await Product.create(productData);


    await meiliService.indexProduct(product);

    await redisService.delByPattern("products:*");

    return product;
};

const getAllProducts = async (query) => {
    // Pagination
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 2;
    const skip = (page - 1) * limit;
    const cacheKey = `products:${new URLSearchParams(query).toString()}`;
    

    // Filters
    const filter = {
        isActive: true,
    };

    // Category Filter
    if (query.category) {
        filter.category = query.category;
    }

    // Brand Filter
    if (query.brand) {
        filter.brand = query.brand;
    }

    // Price Filter
    if (query.minPrice || query.maxPrice) {
        filter.price = {};

        if (query.minPrice) {
            filter.price.$gte = Number(query.minPrice);
        }

        if (query.maxPrice) {
            filter.price.$lte = Number(query.maxPrice);
        }
    }

    

    // Sorting
    let sortOption = { createdAt: -1 };

    const allowedSortFields = [
        "price",
        "-price",
        "name",
        "-name",
        "createdAt",
        "-createdAt",
    ];

    if (allowedSortFields.includes(query.sort)) {
        const field = query.sort.startsWith("-")
            ? query.sort.substring(1)
            : query.sort;

        const direction = query.sort.startsWith("-") ? -1 : 1;

        sortOption = {
            [field]: direction,
        };
    }

    let productIds = null;

if (query.keyword) {
    const hits = await meiliService.searchProducts(query.keyword);

    productIds = hits.map((product) => product.id);

    if (productIds.length === 0) {
        return {
            products: [],
            currentPage: page,
            pageSize: limit,
            totalPages: 0,
            totalProducts: 0,
        };
    }

    filter._id = {
        $in: productIds,
    };
}

    // Database Query
    return await cacheOrFetch(
        cacheKey,
        async () => {
            const products = await Product.find(filter)
                .sort(sortOption)
                .skip(skip)
                .limit(limit);

            const totalProducts = await Product.countDocuments(filter);

            return {
                products,
                currentPage: page,
                pageSize: limit,
                totalPages: Math.ceil(totalProducts / limit),
                totalProducts,
            };
        }
    );
};

const updateProduct = async (productId, updateData) => {
    const product = await Product.findById(productId);

    if (!product) {
        return null;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updateData,
        {
            new: true,
            runValidators: true,
        }
    );

    await meiliService.updateProduct(updatedProduct);

    await redisService.delByPattern("products:*");

    return updatedProduct;
};

const deleteProduct = async (productId) => {
    const product = await Product.findById(productId);

    if (!product) {
        return null;
    }

    product.isActive = false;

    await product.save();

    await meiliService.deleteProduct(product._id);

    await redisService.delByPattern("products:*");

    return product;
};

module. exports ={
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
};
