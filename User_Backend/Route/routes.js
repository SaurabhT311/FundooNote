const route=require('express').Router();
const userController=require('../Controller/userController');
const {register} = require('../Middleware/validator');
const {validate}=require('../Middleware/validate');
const { userLogin } = require('../Model/UserModel');



route.post('/user/registration', register,validate ,userController.userRegistrationController);
route.post('/user/login',userController.userLoginController);

module.exports=route;

