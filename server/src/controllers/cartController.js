const cartService= require("../services/cartServices");

const addToCart= async(req,res)=>{
    try{
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
    }catch(error){
        console.error(error);

        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
};

const getCart = async(req,res)=>{
    try{
        const cart = await cartService.getCart(req.user.userId);

        return res.status(200).json({
            success: true,
            cart,
        });

    }catch(error){
        console.error(error);

        return res.status(500).json({
            success: false,
            message:"Internal Server Error",
        });
    }
};

const updateCartItem = async(req,res)=>{
    try{
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
    }catch(error){
        console.error(error);

        return res.status(500).json({
            success: true,
            message:"Internal Server Error",
        });

    }
};

const removeCartItem = async(req,res)=>{
    try{
        const  cart= await cartService.removeCartItem(
            req.user.userId,
            req.params.productId,
        );

        return res.status(200).json({
            success:true,
            message:"Product removed from cart.",
            cart,
        });
    }catch(error){
        console.error(error);

        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

const clearCart=async(req,res)=>{
    try{
        const cart = await cartService.clearCart(req.user.userId);

        return res.status(200).json({
            success:true,
            message:"Cart cleared successfully.",
            cart,
        });
    } catch(error){
        console.error(error);

        return res.status(500).json({
            success: false,
            message:"Internal Server Error"
        });
    }
};

module.exports ={
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart,
};