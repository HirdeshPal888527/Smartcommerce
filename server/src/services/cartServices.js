const Cart=require("../models/Cart");
const Product= require("../models/Product");

const getCartOrThrow = async(userId)=>{
    const cart = await Cart.findOne({user:userId});

    if(!cart){
        throw new Error("Cart not found.");
    }
    return cart;
} 

const addToCart= async(userId,productId,quantity=1)=>{
    quantity=Number(quantity);
    if(Number.isNaN(quantity) ||  quantity<1){
        throw new Error("Quantity must be positive number.");
    }
    const product=await Product.findById(productId);

    if(!product || !product.isActive){
        throw new Error("Product not found.");
    }
    if(product.stock===0){
        throw new Error("Product is out of stock.")
    }

    if(quantity>product.stock){
        throw new Error("Requested quantity exceeds available stock.");
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
            throw new Error("Requested quantity exceeds available stock.")
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
        throw new Error("Quantity must be zero or a positive number.");
    }

    const cart = await getCartOrThrow(userId);

    const item= cart.items.find(
        (item)=> item.product.toString() === productId.toString()
    );

    if(!item){
        throw new Error("Product not found in cart")
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
        throw new Error("Product not found.");
    }

    if(quantity >  product.stock){
        throw new Error("Requested quantity exceeds available stock.");
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
        throw new Error("Product not found in cart.");
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