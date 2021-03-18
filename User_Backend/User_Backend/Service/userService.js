const userModel = require('../Model/UserModel');
let bcryptPassword = require('../Middleware/bcryptPassword');
const jwtToken = require('../Middleware/jwtToken');
const mailer = require('../Middleware/email');
let { OK, Conflict, BadRequest, NotFound, Unauthorized } = require('../Middleware/httpStatusCode.json');
const { Result } = require('express-validator');
const { error } = require('winston');

class userService {

    userRegistrationService = (req, callback) => {
        req.password = bcryptPassword.securedPassword(req.password);
        return userModel.userRegistration(req, (error, data = null) => {
            if (error) {
                if (error.length > 0) {
                    return callback({ flag: false, message: "Email id exist!", code: Conflict });
                }
                return callback({ flag: false, message: "Registration failed!", error: error, code: BadRequest });
            }
            else {
                return callback({ flag: true, message: "Registration successfull!", data: data, code: OK });
            }
        })
    }

    userLoginService = (req, callback) => {
        return userModel.userLogin(req, (error, data = null) => {
            if (error) {
                if (error.length === 0) {
                    return callback({ flag: false, message: "Email does not exists!", code: NotFound });
                }
                return callback({ flag: false, message: "Login Failed !", error: error, code: BadRequest });
            }
            else {
                if (data) {
                    console.log("req is:",req);
                    return callback(null, { flag: true, message: "Login sucessfull !", data: data, code: OK });
                }
                else {
                    console.log(req);
                    return callback({ flag: false, message: "password does not matched !", code: Unauthorized });
                }
            }
        })
    }

    userForgetPasswordService(data) {
        let email = data.email;
        let tokenData = {
            email: email,
        }
        return userModel.userForgetPassword(email)
            .then((result) => {
                if (result) {
                    let token = jwtToken.tokenGeneration(tokenData);
                    mailer.mail(email, token);
                    return ({ flag: true, message: "Please Check your mail", code: OK })
                }
                else {
                    
                    return ({ flag: false, message: "Email does not exist", code: NotFound });
                }
            }).catch((error) => {
                return ({ flag: false, message: "Something went wrong", error: error });
            })
    }

    userResetPasswordService(email, password) {
        let pass = bcryptPassword.securedPassword(password);
        return userModel.userResetPassword(email, pass)
            .then((result) => {
                if (result) {
                    return ({ flag: true, message: "Password has changed succesfully", code: OK });
                } else {
                    return ({ flag: false, message: "Something went wrong!", code: BadRequest });
                }
            }).catch((err) => {
                return ({ flag: false, message: "Please enter valid input !", code: NotFound });
            });
    }

}

module.exports = new userService();