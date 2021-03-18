const noteModels = require('../Model/noteModel');
let { OK, NotFound, BadRequest } = require('../Middleware/httpStatusCode.json');
const userModels = require('../Model/UserModel');
const { error } = require('winston');


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

    addCollabratorService(noteID, email) {
        return userModels.find(email)
            .then((result) => {
                if (result) {
                    console.log("r is:", result);
                    let push = { $push: { collabId: result._id }, new:true
                }
                    return noteModels.collabrationAddRemove(noteID, push)
                        .then((result) => {
                            return ({ message: "Collabration Successfully", data: result, code: OK });
                        }).catch((err) => {
                            return ({ message: "Collabration is Unsuccessful!!", error: err, code: NotFound });
                        });
                } else {
                    return ({ message: "User Not Found!!", error: err, code: NotFound });
                }
            }).catch((err) => {
                return ({ message: "Please Enter Correct User Credential", error: err, code: NotFound });
            });
    }


//     removeCollaboratorService(noteId, email) {
//         return userModels.search()
//            .then((result) => {
//                if (result) {
//                    console.log("res is:", result);
//                    let pull = { $pull: { collabId: result._id },new:true }
//                    return noteModels.collabrationAddRemove(noteId, pull)
//                        .then((result) => {
//                            return ({ flag: true, message: "Removed Collaborator recipient", data: result, code: OK })
//                        }).catch((err) => {
//                            return ({ flag: false, message: "Removal of collaborator denied", error: err, code: NotFound })
//                        })
//                } else {
//                    return ({ flag: false, message: "User Not Found", error: err, code: NotFound })
//                }
//            }).catch((err) => {
//                return ({ flag: false, message: "Enter valid credentials", error: err, code: NotFound })
//            })
//    }

    removeCollaboratorService(noteId, email) {
         return userModels.find(email)
            .then((result) => {
                if (result) {
                    console.log("res is:", result);
                    let pull = { $pull: { collabId: result._id },new:true }
                    return noteModels.collabrationAddRemove(noteId, pull)
                        .then((result) => {
                            return ({ flag: true, message: "Removed Collaborator recipient", data: result, code: OK })
                        }).catch((err) => {
                            return ({ flag: false, message: "Removal of collaborator denied", error: err, code: NotFound })
                        })
                } else {
                    return ({ flag: false, message: "User Not Found", error: err, code: NotFound })
                }
            }).catch((err) => {
                return ({ flag: false, message: "Enter valid credentials", error: err, code: NotFound })
            })
    }

    searchService(searchKey) {
        console.log("search:",searchKey);
        return userModels.search(searchKey)
        
            .then((result) => {
                if (result.length == 0) {
                    return ({ message: " Data Not Found!", error: err, code:NotFound });
                } else {
                    console.log("res is:",result);
                    return ({ message: "Search Data Found", data: result, code:OK });
                }
            }).catch((err) => {
                return ({ message: "Search Matching Data Not Found!", error: err, code:NotFound });
            });
    }
}

module.exports = new noteService();

