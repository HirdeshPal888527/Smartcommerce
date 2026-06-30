const cloudinary=require("../config/cloudinary");
const streamifier= require("streamifier")
const uploadImage = async (req,res)=> {
    try{
        if(!req.file){
            return res.status(400).json({
                success: false,
                message: "Please upload an image."
            })
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

    }catch(error){
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports= {
    uploadImage,
};