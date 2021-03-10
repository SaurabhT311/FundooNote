let userService = require('../Service/userService');
const statusCode = require('../Middleware/httpStatusCode.json')
require('dotenv').config();
const { infoLogger, errorLogger } = require('../Middleware/logger');
const response = {};

class UserController {

    userControllerResponse = (res, value) => {
        response.success = value.flag;
        response.message = value.message;
        response.error = value.error;
        response.data = value.data;
        return res.status(value.code).send(response);
    }

    userRegistrationController = (req, res, next) => {
        try {
            userService.userRegistrationService(req.body, (error, data) => {
                if (error) {
                    errorLogger.error(JSON.stringify(error));
                    this.userControllerResponse(res, error);
                } else {
                    infoLogger.info(JSON.stringify(data));
                    this.userControllerResponse(res, data);
                }
            })
        } catch (error) {
            next(error);
        }
    }


    userLoginController = (req, res, next) => {
        try {
            userService.userLoginService(req.body, (error, data) => {
                if (error) {
                    errorLogger.error(JSON.stringify(error))
                    this.userControllerResponse(res, error)
                } else {
                    infoLogger.info(JSON.stringify(data))
                    this.userControllerResponse(res, data);
                }
            })
        }
        catch (error) {
            next(error)
        }
    }

    userForgetPasswordController(req, res,next){
        try {
            userService.userForgetPasswordService(req.body)
            .then((result) => {
                response.flag = true;
                response.message = result.message;
                res.status(statusCode.OK).send(response);
            }).catch((err) => {
                response.flag = false;
                response.data = err.message;
                res.status(statusCode.BadRequest).send(response);
            });
        } catch (error) {
            next(error);
        }
    }

    userResetPasswordController(req,res){
        try{
            console.log(req.body.password);
            let password=req.body.password;
            let email=req.decoded.email;                
            //  console.log(email);
            userService.userResetPasswordService(email,password)
            .then((result)=>{
                response.flag = true;
                response.message = result.message;
                res.status(statusCode.OK).send(response);
            }).catch((err) => {
                response.flag = false;
                response.data = err.message;
                res.status(statusCode.BadRequest).send(response);
            });
        }catch(error){
            next(error);
        }

    }


}


module.exports = new UserController();