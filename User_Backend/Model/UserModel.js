const mongoose = require('mongoose');
const bcryptPassword = require('../Middleware/bcryptPassword');
const jwtToken=require('../Middleware/jwtToken');
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
    mobile:{
        type: Number,
        required: [true,'mobile number is required'],   
    },
    password:{
        type:String,
        required:true,
    },
})


let users = mongoose.model('FundooDatabase', userSchema);


class userModel
{

    userDataObject=(result)=>{
        return{
            "_id":result._id,
            "firstName":result.firstName,
            "lastName":result.lastName,
            "email":result.email,
            "mobile":result.mobile
        }
    }


    userRegistration=(req,callback)=>{ 
        users.find({"email":req.email}, (err,data)=>{
            if(err){
                callback(err);
            }else if(data.length > 0){
                callback(data);
            }else{
            users.create(req,(err,data) => {
                if(err)
                {
                    return callback(err);
                }
                else{
                    return callback(null,data)
                }
            })
        }
    })
    }

    userLogin=(req,callback)=>{
        users.find({"email":req.email},(err,data)=>{
            if(err)
            {
                callback(err);
            }
            else if(data.length===0) //index position 
            {
                callback(data);
            }else{
                bcryptPassword.comparePassword(req.password,data[0].password).then(async result=>{
                    if(result){
                        let token=jwtToken.tokenGeneration(this.userDataObject(data[0]));
                        let userData={
                            "_id":data[0]._id,
                            "firstName":data[0].firstName,
                            "lastName":data[0].lastName,
                            "email":data[0].email,
                            "mobile":data[0].mobile,
                            "token":token.token
                        }
                        callback(null,userData);
                    }
                    else{
                        callback(null,result);
                    }
                })
            }
        })
    }
}


module.exports=new userModel();