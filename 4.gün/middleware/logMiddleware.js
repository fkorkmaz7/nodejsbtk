function logRequesDetails(req,res,next){
    console.log(`method : ${req.method}, url : ${req.url}`);
    next();
}

module.exports = logRequesDetails;