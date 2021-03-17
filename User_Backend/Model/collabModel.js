const mongoose = require('mongoose');
const noteModels = require('../Model/noteModel');
const collabSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    noteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notes'
    },

    email: {
        type: "String",
        ref: 'User',
        require: true
    }
});

var collab = mongoose.model('collab', collabSchema);


class collabModel{

    addCollaborator=(data,callback)=>{
        let collabData=new collab(data);
        return collabData.save((err,result)=>{
            if(err){
                callback(err);
            }else{
                console.log("result is:",result);
                
            }
        })
    }

}


module.exports=new collabModel();