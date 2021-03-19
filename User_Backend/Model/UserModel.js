const mongoose = require('mongoose');
const { error } = require('winston');
const mailer = require('../Middleware/email');
const bcryptPassword = require('../Middleware/bcryptPassword');
const jwtToken = require('../Middleware/jwtToken');
const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,

    },
    lastName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    mobile: {
        type: Number,
        required: [true, 'mobile number is required'],
    },

    password: {
        type: String,
        required: true,
    },
})


let users = mongoose.model('User', userSchema);

class userModel {
    userDataObject = (result) => {
        return {
            "_id": result._id,
            "firstName": result.firstName,
            "lastName": result.lastName,
            "email": result.email,
            "mobile": result.mobile
        }
    }


    userRegistration = (req, callback) => {
        users.find({ "email": req.email }, (err, data) => {
            if (err) {
                callback(err);
            } else if (data.length > 0) {
                callback(data);
            } else {
                users.create(req, (err, data) => {
                    if (err) {
                        return callback(err);
                    }
                    else {
                        return callback(null, data)
                    }
                })
            }
        })
    }

    userLogin = (req, callback) => {
        users.find({ "email": req.email }, (err, data) => {
            if (err) {
                callback(err);
            }
            else if (data.length === 0) {
                callback(data);
            } else {
                bcryptPassword.comparePassword(req.password, data[0].password).then(async result => {
                    if (result) {
                        let token = jwtToken.tokenGeneration(this.userDataObject(data[0]));
                        let userData = {
                            "_id": data[0]._id,
                            "firstName": data[0].firstName,
                            "lastName": data[0].lastName,
                            "email": data[0].email,
                            "mobile": data[0].mobile,
                            "token": token
                        }
                        callback(null, userData);
                    }
                    else {
                        callback(null, result);
                    }
                })
            }
        })
    }

    userForgetPassword(email) {
        return users.findOne({ "email": email })
            .then((result) => {
                return result;
            }).catch((error) => {
                return ({ message: "Something went wrong", error: error });
            })
    }



    userResetPassword(email, password) {

        return users.findOneAndUpdate({ email: email }, { password: password })
            .then((result) => {
                return result;
            }).catch((err) => {
                return ({ message: "Something went wrong", error: error });
            })
    }


    find(userId) {
        console.log("id is:", userId);
        return users.findById(userId)
            .then((result) => {
                console.log("result is:", result);
                return result;
            }).catch((error) => {
                console.log("res:");
                return error;
            })
    }


    search(searchKey) {
        return users.find({
            $or: [
                { "email": { $regex: `${searchKey}` } },
                { "firstName": { $regex: `${searchKey}` } },
                { "lastName": { $regex: `${searchKey}` } }
            ]
        })
            .then((result) => {
                // console.log("rrrr:",result);
                return result;
            })
            .catch((error) => {
                console.log("error");
                return error;
            })
    }
}

module.exports = new userModel();