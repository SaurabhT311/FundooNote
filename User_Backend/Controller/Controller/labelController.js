const labelServices = require('../Service/labelService');
const statusCode = require('../Middleware/httpStatusCode.json');
const { infoLogger, errorLogger } = require('../Middleware/logger');
const { error } = require('winston');
const labelService = require('../Service/labelService');
const response = {};


class labelController {

    labelControllerResponse = (res, value) => {
        response.flag=value.flag;
        response.message = value.message;
        response.err = value.error;
        response.result = value.result;
        return res.status(value.code).send(response);
    }

    createLabelController = (req, res, next) => {
        try {
            const labelData = {
                userId: req.decoded,
                //   noteId:req.body.noteId,
                labelTitle: req.body.labelTitle,
            };
            labelServices.createLabelService(labelData, (err, result) => {
                console.log("labeldata is:", labelData);
                if (result) {
                    infoLogger.info(JSON.stringify(result));
                    this.labelControllerResponse(res, result);
                } else if (err) {
                    console.log("res is");
                    errorLogger.error(JSON.stringify(error));
                    this.labelControllerResponse(res, err);
                }
            })
        } catch (error) {
            next(error);
            
        }
    }

    getLabelController = (req, res, next) => {
        try {
            const labelData = {
                userId: req.decoded._id
            };
            labelServices.getLabelService(labelData, (err, result) => {
                console.log("labeldata is:", labelData);
                if (err) {
                    console.log("error is");
                    errorLogger.error(JSON.stringify(error));
                    this.labelControllerResponse(res, error);
                } else {
                    console.log("res is", result);
                    infoLogger.info(JSON.stringify(result));
                    this.labelControllerResponse(res, result);
                }
            })
        } catch (error) {
            next(error);
        }
    }


    updateLabelController = (req, res, next) => {
        try {
            const data = {
                labelTitle: req.body,
                id: req.params.id
            }
            console.log("obj is:", data);
            labelServices.updateLabelService(data, (err, result) => {
                if (err) {
                    response.flag = false;
                    response.message = "Labels not updated";
                    return res.status(statusCode.BadRequest).send(response);
                } else {
                    console.log("result is:", result);
                    response.flag = true;
                    response.result = result;
                    response.message = "Label updated!!!";
                    return res.status(statusCode.OK).send(response);
                }
            })
        } catch (error) {
            next(error);
        }
    }


    deleteLabelController=(req,res,next)=>{
        try{
            let id=req.params.id;
            labelServices.deleteLabelService(id,(err,result)=>{
                if(err){
                    response.flag=false;
                    response.message="Label does not deleted";
                    return res.status(statusCode.BadRequest).send(response);
                }else{
                    response.flag=true;
                    response.message="Label deleted successfully";
                    return res.status(statusCode.OK).send(response);
                }
            })
        }catch(error){
            next(error);
        }

    }

    getAllLabelController=(req,res)=>{
        labelServices.allLabelService((err,result)=>{
            if(err){
            response.flag=false;
            response.message="Not Found Labels";
            return res.status(statusCode.BadRequest).send(response);
            }else{
                response.flag=true;
                response.message="Labels found successfully";
                response.result=result;
                res.status(statusCode.OK).send(response);
            }
        })
    }
}


module.exports = new labelController();