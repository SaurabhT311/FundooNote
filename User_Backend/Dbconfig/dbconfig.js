const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/FundooDatabase",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("fulfill");
}).catch((e)=>{
    console.log("no connection");
})