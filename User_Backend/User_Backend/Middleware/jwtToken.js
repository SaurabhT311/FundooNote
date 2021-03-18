const jwt = require('jsonwebtoken');
let { Forbidden, Unauthorized } = require('./httpStatusCode.json');
const { infoLogger } = require('../Middleware/logger');
const logger = require('./logger');
let response = {};


const tokenGeneration = (payload) => {
        let token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '2hr' })
        // console.log(token);
        //        console.log(process.env.SECRET_KEY);
        response.success = true;
        response.message = "Token Generated";
        response.token = token;
        infoLogger.info(JSON.stringify(response));
        return token;
};

const tokenVerification = (req, res, next) => {
         try {
                
                let token = req.header('token') || req.params.token;
                if (token) {
                        jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
                                if (err) {
                                        return res.send({
                                                success: false,
                                                message: 'Invalid Token'
                                        });
                                } else {
                                        req.decoded = data;
                                        console.log(req.decoded);
                                        next();
                                }
                        });
                } else {
                        console.log('No Token Provided');
                        return res.send({
                                success: false,
                                message: 'No token possible'
                        });
                }
        } catch (error) {
                next(error);
        }
}

module.exports = { tokenGeneration, tokenVerification };

