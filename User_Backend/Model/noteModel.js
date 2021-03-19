const mongoose = require('mongoose');
const labelModels = require('../Model/labelModel');
const redisCache = require('../Middleware/redisCache');
const noteSchema = new mongoose.Schema({

    Title: {
        type: String,
        required: true,

    },
    Description: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    isArchive: {
        type: Boolean,
        default: false
    },

    isTrash: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
        default: "#FFFFFF"
    },

    labelId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "labels"
    }],

    collabId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notes'
    }]
});

const notes = mongoose.model('Notes', noteSchema);

class noteModel {

    createNote(data) {
        console.log("data is:", data);
        let noteData = new notes(data);
        return noteData.save(data)
            .then((result) => {
                return result;
            }).catch((error) => {
                return error;
            });
    }

    getNote(id) {
        return notes.find({ "userId": id }).populate('userId')
            .then((result) => {
                return result;
            }).catch((error) => {
                return error
            })
    }


    updateNote(id, newData) {
        console.log("model updates", id, newData);
        return notes.findByIdAndUpdate(id, newData, { new: true })
            .then((result) => {
                console.log("res:", result);
                return result;
            }).catch((error) => {
                return error;
            })
    }


    isArchiveNote = (obj, callback) => {
        notes.findById(obj.isArchiveNote_ID, function (err, data) {
            if (err) {
                callback({ 'message': "Note on that ID not found", 'success': false })
            } else if (data) {
                if (data.isArchive == true || data.isArchive == false) {
                    let updatedObj = {
                        isArchive: !data.isArchive
                    }
                    notes.findByIdAndUpdate(obj.isArchiveNote_ID, updatedObj, (err, success) => {
                        if (err) {
                            callback({ 'message': "Error failed to move to the Archived", 'success': false })
                        } else if (success) {
                            callback({ 'message': "Successfull in moving to the Archived", 'success': true })
                        }
                    })
                }
            }
        })
    }


    isTrashNote = (obj, callback) => {
        notes.findById(obj.moveToTrashNote_ID, function (err, data) {
            if (err) {
                callback({ 'message': "Note on that ID not found", 'success': false })
            } else if (data) {
                if (data.isTrash == true || data.isTrash == false) {
                    let updatedObj = {
                        isTrash: !data.isTrash
                    }
                    notes.findByIdAndUpdate(obj.moveToTrashNote_ID, updatedObj, (err, success) => {
                        if (err) {
                            callback({ 'message': "Error failed to move to the trash", 'success': false })
                        } else if (success) {
                            callback({ 'message': "Successfull in moving to the trash", 'success': true })
                        }
                    })
                }
            }
        })
    }

    deleteNote(id) {
        return notes.findByIdAndDelete(id)
            .then((result) => {
                return result;
            }).catch((error) => {
                return error;
            })
    }

    find(id) {
        console.log("note id: ", id);
        return notes.findById(id)
            .then((result) => {
                console.log("result is:", result);
                return result;
            }).catch((error) => {
                console.log("res:", result);
                return error;
            })
    }


    addLabelToNote = (infoData, callback) => {
        console.log("label is:", infoData.noteId);
        notes.findById(infoData.noteId, (err, labelData) => {
            if (err) {
                callback(err)
            } else {
                return notes.findByIdAndUpdate(infoData.noteId, {
                    $push: {
                        labelId: infoData.labelId,
                    },
                }, { new: true },
                    callback
                );
            }
            callback(err);
        })
    }

    deleteLabelToNote = (labelData, callback) => {
        console.log("label is:", labelData.noteId);
        return notes.findByIdAndUpdate(labelData.noteId, {
            $pull: { labelId: labelData.labelId },
        }, { new: true },
            callback(null, result)
        );
    }


    collabrationAddRemove(noteId, userId) {
        return notes.findByIdAndUpdate(noteId, userId)
            .then((result) => {
                // console.log("user is jhajc",result);
                return result;
            })
            .catch((err) => {
                return err;
            })
    }
}



module.exports = new noteModel();
