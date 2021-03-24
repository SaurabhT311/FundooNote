const route = require('express').Router();
const userController = require('../Controller/userController');
const { register, login, forget, reset, addNote, archive, label, updateNotes, trash } = require('../Middleware/validator');
const { validate } = require('../Middleware/validate');
const jwtToken = require('../Middleware/jwtToken');
const noteController = require('../Controller/noteController');
const labelController = require('../Controller/labelController');
const redisCache = require('../Middleware/redisCache');



route.post('/registration', register, validate, userController.userRegistrationController);
route.post('/login', login, validate, userController.userLoginController);
route.post('/forgotpassword', forget, validate, userController.userForgetPasswordController);
route.post('/resetpassword/:token', reset, jwtToken.tokenVerification, userController.userResetPasswordController);

//notes routes
route.post('/note',addNote,validate, jwtToken.tokenVerification, noteController.createNoteController);
route.get('/note',jwtToken.tokenVerification, redisCache.checkCache,noteController.getNoteController);
route.put('/note/:id',updateNotes,validate, jwtToken.tokenVerification, noteController.updateNoteController);
route.put('/note/archive/:id',archive,validate, jwtToken.tokenVerification, noteController.archiveNoteController);
route.put('/note/trash/:id',trash,validate, jwtToken.tokenVerification,noteController.trashNoteController);
route.delete('/note/:id', jwtToken.tokenVerification, noteController.deleteNoteController)


//label routes
route.post('/label', jwtToken.tokenVerification, labelController.createLabelController);
route.get('/label', jwtToken.tokenVerification, labelController.getLabelController);
route.post('/update/:id', jwtToken.tokenVerification, labelController.updateLabelController);
route.delete('/delete/:id', jwtToken.tokenVerification, labelController.deleteLabelController);
route.get('/alluserlabel', labelController.getAllLabelController);


//Label Added To Note
route.put('/addlabel/:noteId',label,validate, jwtToken.tokenVerification, noteController.addLabelToNoteController);
route.put('/deletelabel/:noteId',label,validate, jwtToken.tokenVerification, noteController.deleteLabelToNoteController);

//collaborators
route.get('/note/search',jwtToken.tokenVerification,noteController.searchController);
route.put('/addcollaborator/:id',jwtToken.tokenVerification,noteController.addCollabratorController);
route.put('/removecollaborator/:id',jwtToken.tokenVerification,noteController.removeCollaboratorController);

module.exports = route;

