const { validationResult } = require('express-validator');
const { InternalServerError, UnprocessableEntity } = require('./httpStatusCode.json');
const { errorLogger } = require('../Middleware/logger');
let response = {};


exports.validate = (req, res, next) => {
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            response.success = false;
            response.message = "Invalid Credentials!";
            response.error = errors.array();
             errorLogger.error(JSON.stringify(response));
            return res.status(UnprocessableEntity).send(response);
        } else {
            next();
        }
    }
    catch (error) {
        response.success = false;
        response.message = "Something went wrong!";
         errorLogger.error(JSON.stringify(response));
        return res.status(InternalServerError).send(response);
    }
}