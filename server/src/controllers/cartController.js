const cartService= require("../services/cartServices");
const asyncHandler=require("../utils/asyncHandler");

const addToCart=asyncHandler(async(req,res)=>{
        const{productId,quantity}= req.body;

        const cart = await cartService.addToCart(
            req.user.userId,
            productId,
            quantity,
        );

        return res.status(200).json({
            success: true,
            message:"Product added to cart successfully.",
            cart,
        });
    
});

const getCart = asyncHandler(async(req,res)=>{
        const cart = await cartService.getCart(req.user.userId);

        return res.status(200).json({
            success: true,
            cart,
        });

    
});

const updateCartItem = asyncHandler(async(req,res)=>{
        const{quantity}= req.body;

        const cart = await cartService.updateCartItem(
            req.user.userId,
            req.params.productId,
            quantity
        );
        return res.status(200).json({
            success:true,
            message:"Cart updated Successfully.",
            cart
        })
});

const removeCartItem = asyncHandler(async(req,res)=>{
        const  cart= await cartService.removeCartItem(
            req.user.userId,
            req.params.productId,
        );

        return res.status(200).json({
            success:true,
            message:"Product removed from cart.",
            cart,
        });
    
});

const clearCart=asyncHandler(async(req,res)=>{
        const cart = await cartService.clearCart(req.user.userId);

        return res.status(200).json({
            success:true,
            message:"Cart cleared successfully.",
            cart,
        });
});

module.exports ={
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart,
};