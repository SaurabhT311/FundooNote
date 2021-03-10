const noteServices = require('../Service/noteService');
const statusCode = require('../Middleware/httpStatusCode.json');
const response = {};

class noteController {

    createNoteController(req, res) {
        try {
            let id = req.decoded._id;
            // console.log("it is:",id);
            noteServices.createNoteService(req.body, id)
                .then((result) => {
                    response.success = true;
                    response.message = result.message;
                    response.data = result.data;
                    res.status(statusCode.OK).send(response);
                    return response;
                }).catch((err) => {
                    response.success = false;
                    response.message = err.message;
                    res.status(statusCode.BadRequest).send(response);
                })
        } catch (error) {
            console.log(error);
        }
    }


    getNoteController(req, res) {
        try {
            let id = req.decoded._id;
            console.log("id is:", id);
            noteServices.getNoteService(id)
                .then((result) => {
                    // console.log(result);
                    response.data = result.data;
                    response.success = true;
                    response.message = result.message;

                    res.status(statusCode.OK).send(response);
                }).catch((err) => {
                    response.success = false;
                    response.message = err.message;
                    res.status(statusCode.BadRequest).send(response);
                })
        } catch (error) {
            console.log(error);
        }
    }

    updateNoteController(req, res) {
        try {
            let newData = req.body;
            let id = req.params.id;
            console.log("Update Id and data: ", id, newData);
            noteServices.updateNoteService(id, newData)
                .then((result) => {
                    response.success = true;
                    response.message = result.message;
                    response.data = result.data;
                    res.status(statusCode.OK).send(response);
                }).catch((err) => {
                    response.success = false;
                    response.message = err.message;
                    res.status(statusCode.NotFound).send(response);
                })
        } catch (error) {
            console.log("Invalid record");
        }
    }

    deleteNoteController(req, res) {
        try {
            let id = req.params.id;
            console.log("Id is:", id);
            noteServices.deleteNoteService(id)
                .then((result) => {
                    response.success = true;
                    response.message = result.message;
                    response.data = result.data;
                    res.status(statusCode.OK).send(response);
                }).catch((err) => {
                    response.success = false;
                    response.message = err.message;
                    res.status(statusCode.NotFound).send(response);
                })
        } catch (error) {
            console.log("Invalid record");
        }
    }
}



module.exports = new noteController();