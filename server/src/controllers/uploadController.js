const cloudinary=require("../config/cloudinary");
const streamifier= require("streamifier")


const AppError=require("../utils/AppError");
const asyncHandler=require("../utils/asyncHandler");


const uploadImage =asyncHandler(async (req,res)=> {
        if(!req.file){
            throw new AppError("Please upload an image.",400);
        }

        const result = await new Promise((resolve,reject)=>{
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder:"smartcommerce/products"
                },
                (error,result) => {
                    if(error) return reject(error);

                    resolve(result);
                }
            );
            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
        
        return res.status(200).json({
            success:true,
            message: "Image uploaded successfully.",
            image: {
                url: result.secure_url,
                publicId: result.public_id,
            },
        });

    
});

module.exports= {
    uploadImage,
};