let labelModels = require('../Model/labelModel');
const Label = require('../Model/labelModel');
const note = require('../Model/noteModel');
let { OK, BadRequest, NotFound } = require('../Middleware/httpStatusCode.json');
const { error } = require('winston');


class labelService {

    createLabelService = (labelData, callback) => {
        labelModels.createLable(labelData, (err, result) => {
            if (err) {
                // console.log("error is", err);
                return callback({ flag: false, message: "Labelling failed!", err: error, code: BadRequest });
            } else if (result) {
                console.log("result is:", result);
                return callback(null, { flag: true, message: "Label successfull!", result: result, code: OK });
            }

        })
    }

    getLabelService = (labelData, callback) => {
        console.log("labelData is:", labelData);
        labelModels.getLabel(labelData, (err, result) => {
            console.log("ls:", labelData);
            if (err) {
                callback({ flag: false, message: "No labels available", err: error, code: NotFound });
            } else {
                console.log("result is:", result);
                return callback(null, { flag: true, message: "labels by userId", result: result, code: OK });
            }
        })
    }

    updateLabelService = (labelData, callback) => {
        labelModels.updateLabel(labelData, (err, result) => {
            if (err) {
                return callback(err);
            } else {
                console.log("r is:", result);
                return callback(null, result);
            }
        });
    }


    deleteLabelService = (labelData, callback) => {
        labelModels.deleteLabel(labelData, (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, result);
            }
        })
    }

    allLabelService = (callback) => {
        labelModels.allLabel((err,result)=> {
            if(err) {
                return callback(err);
            }else{
                return callback(null, result);
            }
        });
    }

}

module.exports = new labelService();