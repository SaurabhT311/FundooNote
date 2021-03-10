const route=require('express').Router();
const userController=require('../Controller/userController');
const {register, login, forget, reset} = require('../Middleware/validator');
const {validate}=require('../Middleware/validate');
const jwtToken = require('../Middleware/jwtToken');
const noteController = require('../Controller/noteController');




route.post('/user/registration', register,validate,userController.userRegistrationController);
route.post('/user/login',login,validate,userController.userLoginController);
route.post('/user/forgotpassword',forget,validate, userController.userForgetPasswordController);
route.post('/resetpassword/:token',jwtToken.tokenVerification ,userController.userResetPasswordController);

//notes routes
route.post('/note/create', jwtToken.tokenVerification,noteController.createNoteController);
route.get('/note/get',jwtToken.tokenVerification, noteController.getNoteController);
route.put('/note/updateId/:id',jwtToken.tokenVerification,noteController.updateNoteController);
// route.delete('/note/delete/:id',jwtToken.tokenVerification, userController.d );
route.delete('/note/delete/:id',jwtToken.tokenVerification,noteController.deleteNoteController)

module.exports=route;

