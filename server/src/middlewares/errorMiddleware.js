const errorMiddleware =(err,req,res,next)=> {
    console.error(err);
    const statusCode = err.statusCode || 500;
    const status = err.status || "error";
    const message = err.statusCode
        ? err.message
        : "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        status,
        message,
    });
};
module.exports= errorMiddleware;