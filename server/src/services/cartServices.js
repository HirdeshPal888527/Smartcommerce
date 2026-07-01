const Cart=require("../models/Cart");
const Product= require("../models/Product");
const AppError = require("../utils/AppError");

const getCartOrThrow = async(userId)=>{
    const cart = await Cart.findOne({user:userId});

    if(!cart){
        throw new AppError("Cart not found.",404);
    }
    return cart;
} 

const addToCart= async(userId,productId,quantity=1)=>{
    quantity=Number(quantity);
    if(Number.isNaN(quantity) ||  quantity<1){
        throw new AppError("Quantity must be positive number.",400);
    }
    const product=await Product.findById(productId);

    if(!product || !product.isActive){
        throw new AppError("Product not found.",404);
    }
    if(product.stock===0){
        throw new AppError("Product is out of stock.",404)
    }

    if(quantity>product.stock){
        throw new AppError("Requested quantity exceeds available stock.",400);
    }

    let cart = await Cart.findOne({user:userId});

    if(!cart){
        cart= await Cart.create({
            user: userId,
            items: [],
        });
    }

    const existingItem = cart.items.find(
        (item)=> item.product.toString()===productId.toString()
    );
    if(existingItem){
        const newQuantity = existingItem.quantity + quantity;

        if(newQuantity > product.stock){
            throw new AppError("Requested quantity exceeds available stock.",400)
        }
        
        existingItem.quantity = newQuantity;
        
    }else{
        cart.items.push({
            product: productId,
            quantity,
        });
    }

    await cart.save();

    return cart;
};

const getCart = async (userId)=>{
    
    const cart= await Cart.findOne({
        user:userId,
    }).populate("items.product");

    if(!cart){
        return{
            user:userId,
            items:[],
        };
    }
    return cart;
};

const updateCartItem= async(userId, productId,quantity)=>{
    quantity=Number(quantity);

    if(Number.isNaN(quantity) || quantity<0){
        throw new AppError("Quantity must be zero or a positive number.",400);
    }

    const cart = await getCartOrThrow(userId);

    const item= cart.items.find(
        (item)=> item.product.toString() === productId.toString()
    );

    if(!item){
        throw new AppError("Product not found in cart",404);
    }

    if(quantity === 0){
        cart.items = cart.items.filter(
            (item)=> item.product.toString() !== productId.toString()
        );

        await cart.save();
        return cart;
    }
    
    const product = await Product.findById(productId);

    if(!product || !product.isActive){
        throw new AppError("Product not found.",404);
    }

    if(quantity >  product.stock){
        throw new AppError("Requested quantity exceeds available stock.",400);
    }

    item.quantity = quantity;

    await cart.save();
    return cart;

};

const removeCartItem = async(userId, productId)=>{
    
    const  cart= await getCartOrThrow(userId);

    const itemExists = cart.items.some(
        (item)=> item.product.toString() === productId.toString()
    );

    if(!itemExists){
        throw new AppError("Product not found in cart.",404);
    }

    cart.items = cart.items.filter(
        (item)=> item.product.toString()!== productId.toString()
    )
    await cart.save();
    return cart;
};

const clearCart = async (userId)=>{
    
    const cart = await getCartOrThrow(userId);
    
    cart.items =[];
    
    await cart.save();
    return cart;
}

module.exports = {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart,
};