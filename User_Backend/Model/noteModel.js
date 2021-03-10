const mongoose = require('mongoose');
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
        ref: 'User'
    },
    color: {
        type: String,
        default: "#FFFFFF"
    }
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
                return ({ message: "Something went wrong", error: error });
            });
    }

    getNote(id) {
        return notes.find({"userId":id})
            .then((result) => {
                return result;
            }).catch((error) => {
                return ({ message: "something went wrong", error: error });
            })
    }


    updateNote(id, newData) {
        console.log("model updates", id, newData);
        return notes.findByIdAndUpdate(id, newData,{new:true}) //the moment we send request, it will show 
            .then((result) => {
                console.log("res:", result);
                return result;
            }).catch((error) => {
                return ({ message: "something went wrong", error: error });
            })
    }

    deleteNote(id)
    {
        return notes.findByIdAndDelete(id)
        .then((result)=>{
            return result;
        }).catch((error)=>{
            return error;
        })
    }

}

module.exports = new noteModel();
