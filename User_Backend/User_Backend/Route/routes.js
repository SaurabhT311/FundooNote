const route = require('express').Router();
const userController = require('../Controller/userController');
const { register, login, forget, reset } = require('../Middleware/validator');
const { validate } = require('../Middleware/validate');
const jwtToken = require('../Middleware/jwtToken');
const noteController = require('../Controller/noteController');
const labelController = require('../Controller/labelController');



route.post('/registration', register, validate, userController.userRegistrationController);
route.post('/login', login, validate, userController.userLoginController);
route.post('/forgotpassword', forget, validate, userController.userForgetPasswordController);
route.post('/resetpassword/:token', reset, jwtToken.tokenVerification, userController.userResetPasswordController);

//notes routes
route.post('/note/create', jwtToken.tokenVerification, noteController.createNoteController);
route.get('/note/get', jwtToken.tokenVerification, noteController.getNoteController);
route.put('/note/updateId/:id', jwtToken.tokenVerification, noteController.updateNoteController);
route.put('/note/archive', jwtToken.tokenVerification, noteController.archiveNoteController);
route.delete('/note/delete/:id', jwtToken.tokenVerification, noteController.deleteNoteController)


//label routes
route.post('/label/create', jwtToken.tokenVerification, labelController.createLabelController);
route.get('/label', jwtToken.tokenVerification, labelController.getLabelController);
route.post('/update/:id', jwtToken.tokenVerification, labelController.updateLabelController);
route.delete('/delete/:id', jwtToken.tokenVerification, labelController.deleteLabelController);
route.get('/alluserlabel', labelController.getAllLabelController);


//Label Added To Note
route.put('/addlabel/:noteId', jwtToken.tokenVerification, noteController.addLabelToNoteController);
route.put('/deletelabel/:noteId', jwtToken.tokenVerification, noteController.deleteLabelToNoteController);

//collaborators
route.get('/note/search',jwtToken.tokenVerification,noteController.searchController);
route.put('/addcollaborator/:id',jwtToken.tokenVerification,noteController.addCollabratorController);
route.put('/removecollaborator/:id',jwtToken.tokenVerification,noteController.removeCollaboratorController);

module.exports = route;

