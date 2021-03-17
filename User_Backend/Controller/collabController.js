var collabServices=require('../Service/collabService');

class collabController{

addCollaboratorController=(req,res)=>{
    const data={
        userId:req.body.userId,
        noteId:req.body.noteId,
        email:req.body.email
    }

    collabServices.addCollaboratorService(data,(err,result)=>{
        
    })
}

}

module.exports=new collabController();