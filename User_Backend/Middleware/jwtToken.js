const jwt=require('jsonwebtoken');
// let {Forbidden, Unauthorized}=require('./httpStatusCode.json');
const {infoLogger}=require('../Middleware/logger');
let response={};


const tokenGeneration=(payload)=>{
        let token=jwt.sign(payload,process.env.SECRET_KEY, {expiresIn:'2400s'})
        response.success=true;
        response.message="Token Generated";
        response.token=token;
        infoLogger.info(JSON.stringify(response));
        return response;
    
}

module.exports={tokenGeneration}