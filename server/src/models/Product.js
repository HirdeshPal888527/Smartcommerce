const mongoose=require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 3000,
        },

        brand: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        }, 

        discountPrice: {
            type: Number,
            default: 0,
            min: 0,
        }, 

        stock: {
            type: Number,
            required:  true,
            min: 0,
            default:0,
        },

        images: [
            {
                url:{
                    type: String,
                    required: true,
                },
                publicId:{
                    type: String,
                    required: true,
                },
            },
        ],

        seller:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        averageRating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },

        numReviews: {
            type: Number,
            default: 0,
            min:0,
        },

        specifications: {
            type:mongoose.Schema.Types.Mixed,
            default: {},
        },

        variants: [
            {
                type: mongoose.Schema.Types.Mixed,
            },
        ],

        isActive:{
            type: Boolean,
            default: true,
        },

    },
    {
        timestamps: true,
    }
);
productSchema.index({
    name: "text",
    description: "text",
    brand: "text",
    category: "text",
});

module.exports= mongoose.model("Product",productSchema);