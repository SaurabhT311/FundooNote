const noteModels = require('../Model/noteModel');
let { OK, NotFound, BadRequest } = require('../Middleware/httpStatusCode.json');
const { callbackPromise } = require('nodemailer/lib/shared');

class noteService {

    createNoteService(data, id) {
        data.userId = id;
        //  console.log(data.userId);
        return noteModels.createNote(data).then((result) => {
            return ({ flag: true, message: "Record added Succesfully", data: result, code: OK });
        }).catch((error) => {
            return ({ flag: false, message: "failed to add record", error: error, code: BadRequest })
        })
    }

    getNoteService(id) {
        return noteModels.getNote(id)
            .then((result) => {
                console.log("result is:", result);
                return ({ flag: true, message: "Notes by userId", data: result, code: OK })
            }).catch((error) => {
                return ({ flag: false, message: "No notes available", error: error, code: NotFound });
            })
    }

    updateNoteService(id, newData) {

        return noteModels.updateNote(id, newData)
            .then((result) => {
                console.log("result is:", result);
                return ({ flag: true, message: "Note updated succesfully", data: result, code: OK })
            }).catch((error) => {
                return ({ flag: false, message: "Note is not updated", error: error, code: NotFound })
            })
    }


    archiveNoteService(obj, callback) {
        noteModels.isArchiveNote(obj, (err, data) => {
            if (err) {
                return callback(err)
            } else if (data) {
                return callback(null, data)
            }
        })
    }

    trashNoteService = (obj, callback) => {
        noteModels.isTrashNote(obj, (err, data) => {
            if (err) {
                return callback(err);
            } else if (data) {
                return callback(null, data)
            }
        })
    }

    deleteNoteService(id) {
        return noteModels.deleteNote(id)
            .then((result) => {
                return ({ flag: true, message: "Note deleted succesfully", data: result, code: OK });
            }).catch((error) => {
                return ({ flag: false, message: "Record not found", error: error, code: NotFound });
            })
    }

    addLabelToNoteService = (labelData, callback) => {
        noteModels.addLabelToNote(labelData, (err, result) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, result);
            }
        })
    }


    deleteLabelToNoteService = (labelData, callback) => {
        console.log("labalData is:", labelData);
        noteModels.deleteLabelToNote(labelData, (err, result) => {
            if (err) {
                return callback(err);
            } else {
                console.log("res is:", result);
                return callback(null, result);
            }
        });
    }

}

module.exports = new noteService();

