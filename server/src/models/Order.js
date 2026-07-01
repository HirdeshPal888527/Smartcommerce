const mongoose=require("mongoose");

const orderItemSchema= new mongoose.Schema(
    {
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required: true,
        },
        
        name: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            min:1,
        },
    },
    {
       _id: false, 
    }
);

const shippingAddressSchema= new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true,
        },

        address:{
            type: String,
            required: true,
        },

        city:{
            type: String,
            required: true,
        },

        state: {
            type: String,
            required: true,
        },
        postalCode: {
            type:String,
            required: true,
        },
        country:{
            type: String,
            required: true,
        },
    },
    {
        _id: false,
    }
);

const orderSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        items: {
            type: [orderItemSchema],
            required:true,
        },

        shippingAddress: {
            type: shippingAddressSchema,
            required: true,
        },

        totalAmount: {
            type: Number,
            required: true,
        },

        paymentStatus: {
            type: String,
            enum: ["Pending","Paid","Failed","Refunded"],
            default:"Pending",
        },

        orderStatus: {
            type: String,
            enum: [
                "Pending",
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled",
            ],
            default:"Pending",
        },

        paymentMethod: {
            type: String,
            enum: ["COD", "ONLINE"],
            default: "COD",
        },

        transactionId: {
            type: String,
        },

        paidAt: {
            type: Date,
        },

    },
    {
        timestamps: true,
    }
);

module.exports= mongoose.model("Order",orderSchema);