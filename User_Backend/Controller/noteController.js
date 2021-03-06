const noteServices = require('../Service/noteService');
const statusCode = require('../Middleware/httpStatusCode.json');
const redisCache = require('../Middleware/redisCache');
const response = {};

class noteController {

    createNoteController(req, res) {
        try {
            let id = req.decoded._id;
            // console.log("it is:",id);
            noteServices.createNoteService(req.body, id)
                .then((result) => {
                    // redisCache.loadCache("id akbdcba:",id,result.data)
                    response.flag = true;
                    console.log("result is:", result);
                    response.message = result.message;
                    response.data = result.data;
                    res.status(result.code).send(response);
                    return response;
                }).catch((err) => {
                    response.flag = false;
                    response.message = err.message;
                    res.status(err.code).send(response);
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
                    redisCache.loadCache(id, result.data)
                    // console.log(result);
                    response.flag = true;
                    response.message = result.message;
                    response.data = result.data;
                    res.status(200).send(response);

                }).catch((err) => {
                    console.log("error");
                    response.flag = false;
                    response.message = err.message;
                    res.status(400).send(response);
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
                    response.flag = true;
                    response.message = result.message;
                    response.data = result.data;
                    res.status(result.code).send(response);
                }).catch((err) => {
                    response.flag = false;
                    response.message = err.message;
                    res.status(err.code).send(response);
                })
        } catch (error) {
            console.log("Invalid record");
        }
    }

    archiveNoteController(req, res) {
        let obj = {
            isArchiveNote_ID: req.body.isArchiveNote_ID
        }
        console.log(obj);
        noteServices.archiveNoteService(obj, (data, err) => {
            if (data) {
                response.success = data.success;
                response.message = data.message;
                return res.status(statusCode.OK).send(response);
            } else if (err) {

                response.success = err.success;
                response.message = err.message;
                return res.status(statusCode.BadRequest).send(response);
            }
        })
    }


    trashNoteController(req, res) {
        let obj = {
            moveToTrashNote_ID: req.body.moveToTrashNote_ID
        }
        noteServices.trashNoteService(obj, (err, data) => {
            if (data) {
                response.success = data.success;
                response.message = data.message;
                return res.status(statusCode.OK).send(response);
            } else if (err) {
                response.success = err.success;
                response.message = err.message;
                return res.status(statusCode.BadRequest).send(response);
            }
        })
    }


    deleteNoteController(req, res) {
        try {
            let id = req.params.id;
            console.log("Id is:", id);
            noteServices.deleteNoteService(id)
                .then((result) => {
                    response.flag = true;
                    response.message = result.message;
                    response.data = result.data;
                    res.status(result.code).send(response);
                }).catch((err) => {
                    response.flag = false;
                    response.message = err.message;
                    res.status(err.code).send(response);
                })
        } catch (error) {
            console.log("Invalid record");
        }
    }


    addLabelToNoteController = (req, res, next) => {
        try {
            const data = {
                noteId: req.params.noteId,
                labelId: req.body.labelId
            };
            console.log("data is:", data);
            noteServices.addLabelToNoteService(data, (err, result) => {
                if (err) {
                    response.flag = false;
                    response.message = "Label does not attached to Note";
                    return res.status(statusCode.BadRequest).send(response);
                } else {
                    console.log("result is:", result);
                    response.flag = true;
                    response.message = "Label succesfully attached to Note";
                    response.result = result;
                    return res.status(statusCode.OK).send(response);
                }
            })
        } catch (error) {
            next(error);
        }
    }


    deleteLabelToNoteController = (req, res, next) => {
        try {
            const data = {
                noteId: req.params.noteId,
                labelId: req.body.labelId
            };
            console.log("data is:", data);
            noteServices.deleteLabelToNoteService(data, (err, result) => {
                if (err) {
                    response.flag = false;
                    response.message = "Label does not found on Note";
                    return res.status(statusCode.BadRequest).send(response);
                } else {
                    console.log("res is");
                    response.flag = true;
                    response.message = "Label succesfully removed from Note";
                    response.result = result;
                    return res.status(statusCode.OK).send(response);
                }
            })
        } catch (error) {
            next(error);
        }
    }

    addCollabratorController(req, res) {
        let noteId = req.params.id;
        let userId = req.body.userId;
        // console.log("user:",userId);
        // console.log("noteId:",noteId);
        noteServices.addCollabratorService(noteId, userId)
            .then((result) => {
                // console.log("rrrrrr:",result);
                response.flag = true;
                response.message = result.message;
                response.data = result.data;
                res.status(result.code).send(response);
            }).catch((err) => {
                response.flag = false;
                response.data = err.message;
                res.status(err.code).send(response);
            });
    }

    removeCollaboratorController(req, res) {
        let noteId = req.params.id;
        let userId = req.body.userId
        noteServices.removeCollaboratorService(noteId, userId)
            .then((result) => {
                response.flag = true;
                response.message = result.message;
                response.data = result.data;
                res.status(result.code).send(response);
            }).catch((err) => {
                response.flag = false;
                response.data = err.message;
                res.status(err.code).send(response);
            });
    }

    searchController(req, res) {
        let searchKey = req.body;
        noteServices.searchService(searchKey)
            .then((result) => {
                console.log("result", result);
                response.flag = true;
                response.message = result.message;
                response.data = result.data;
                res.status(result.code).send(response);
            }).catch((err) => {
                console.log("error");
                response.flag = false;
                response.data = err.message;
                res.status(err.code).send(response);
            });
    }

}



module.exports = new noteController();