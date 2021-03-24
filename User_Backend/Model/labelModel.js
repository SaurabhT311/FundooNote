const mongoose = require('mongoose');

const labelSchema = new mongoose.Schema({

    labelTitle: {
        type: String,
        require: true
    },
    noteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notes'
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
   
});

var label = mongoose.model('Label', labelSchema);

class labelModel {

    createLable = (labelData, callback) => {
        console.log("label is:", labelData);
        const data = new label(labelData);
        return data.save((err, result) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, result);
            }
        });
    }

    getLabel = (id, callback) => {
        console.log("id is:", id);
        label.find({ "userId": id.userId }, (err, result) => {
            if (err) {
                callback(err);
            } else {
                console.log("result is:", result);
                return callback(null,result);
            }
        })
    }

    updateLabel = (labelData, callback) => {
        console.log("id is:", labelData.id);
        console.log("data is:",labelData.labelTitle);
        label.findByIdAndUpdate(labelData.id, labelData.labelTitle, { new: true }, (err,result)=>{
            if(err){
                callback(err);
            }else{
                console.log("res is:",result);
                return callback(null,result)
            }
        })
    }

    deleteLabel=(labelData,callback)=>{
        label.findByIdAndDelete(labelData,(err,result)=>{
            if(err){
                return callback(err);
            }else
            {
                return callback(null,result);
            }
        })
    }

    allLabel=(callback)=>{
       return label.find(callback);
    }
}

module.exports = new labelModel;