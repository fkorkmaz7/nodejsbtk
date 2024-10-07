const logRequestDetails = (req,res,next) =>{
    console.log(`method : ${req.method}, url : ${req.url}`);
    next();
};

module.exports = logRequestDetails;