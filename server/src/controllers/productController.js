const Product= require("../models/Product");
const productServices= require("../services/productServices");
const asyncHandler= require("../utils/asyncHandler");
const AppError= require("../utils/AppError");

const createProduct= asyncHandler(async (req,res) => {
        const{
            name,
            description,
            brand,
            category,
            price,
            discountPrice,
            stock,
            images,
            specifications,
            variants,
        }= req.body;

        const product= await productServices.createProduct({
            name,
            description,
            brand,
            category,
            price,
            discountPrice,
            stock,
            images,
            specifications,
            variants,
            seller: req.user.userId,
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully.",
            product,
        });

    
});

const getAllProducts =asyncHandler (async (req,res)=> {
        const products = await Product.find({
            isActive:true,
        });

        return res.status(200).json({
            success:true,
            count: products.length,
            products,

        })
    
});

const getProductById = asyncHandler(async(req,res) => {
        const product = await Product.findById(req.params.id);
        if(!product || !product.isActive){
            throw new AppError("Product not found.",404);
        }
        return res.status(200).json({
            success: true,
            product,
        });

    
});

const UpdateProduct=asyncHandler(async(req,res) => {
        const product= await Product.findById(req.params.id);

        if(!product){
            throw new AppError("Product not found.",404);

        }

        if(
            req.user.role!== "admin" &&
            product.seller.toString()!==req.user.userId
        ){
            throw new AppError("You are not authorized to update this product.",403);
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        return res.status(200).json({
            success: true,
            message:"Product updates successfully.",
            product: updatedProduct,
        })
    
});

const deleteProduct = asyncHandler(async(req,res) => {
        const product =  await Product.findById(req.params.id);

        if(!product){
            throw new AppError("Product not found.",404);
            
        }
        
        const isAdmin = req.user.role==="admin";
        const isOwner = product.seller.toString() === req.user.userId;

        if(!isAdmin && !isOwner){
            throw new AppError("You are not authorized to delete this product.",403);
        }

        product.isActive=false;
        await product.save();

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully."
        })
    
});

module.exports= {
    createProduct,
    getAllProducts,
    getProductById,
    UpdateProduct,
    deleteProduct,
}