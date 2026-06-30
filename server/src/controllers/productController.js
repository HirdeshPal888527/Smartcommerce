const Product= require("../models/Product");
const productServices= require("../services/productServices");

const createProduct= async (req,res) => {
    try{
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

    }catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const getAllProducts = async (req,res)=> {
    try{
        const products = await Product.find({
            isActive:true,
        });

        return res.status(200).json({
            success:true,
            count: products.length,
            products,

        })
    } catch (error){
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const getProductById = async(req,res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product || !product.isActive){
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }
        return res.status(200).json({
            success: true,
            product,
        });

    }catch(error){
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const UpdateProduct= async(req,res) => {
    try{
        const product= await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        if(
            req.user.role!== "admin" &&
            product.seller.toString()!==req.user.userId
        ){
            return res.status(403).json({
                success: false,
                message: " You are not authorized to update this product."
            });
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
    }catch (error){
        console.error(error);

        return res.status(500).json({
            success: false,
            message:"Internal Server Error",
        });

    }
};

const deleteProduct = async(req,res) => {
    try{
        const product =  await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found."
            })
        }
        
        const isAdmin = req.user.role==="admin";
        const isOwner = product.seller.toString() === req.user.userId;

        if(!isAdmin && !isOwner){
            return res.status(403).json({
                success: false,
                message:"You are not authorized to delete this product.",
            })
        }

        product.isActive=false;
        await product.save();

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully."
        })
    }catch(error){
        console.error(error);

        return res.status(500).json({
            success: false,
            message:"Internal Server Error",
        });
    }
};

module.exports= {
    createProduct,
    getAllProducts,
    getProductById,
    UpdateProduct,
    deleteProduct,
}