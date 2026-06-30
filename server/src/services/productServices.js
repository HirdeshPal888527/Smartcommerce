const Product= require("../models/Product");

const createProduct= async(productData)=>{
    const product= await Product.create(productData);

    return product;
};

