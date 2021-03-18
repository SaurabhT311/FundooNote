var nodemailer = require('nodemailer');
const jwtToken = require('./jwtToken');



const mail=(email,token)=>{
   console.log(token);
var transporter = nodemailer.createTransport({
  
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
  
});

const link = `<a href="http://localhost:4000/resetpassword/${token}">Click Here</a>`
console.log(link);
var mailOptions = {
  from: process.env.EMAIL,
  to: email,
  subject: 'Forget Password',
  html: `This email is regarding your request inorder to change your password.
  Below is a link, please click on the link for the further process `+ link,
}

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.messageId);
    console.log('Preview URL : %s', nodemailer.getTestMessageUrl(url));
  }
});
}


module.exports={mail};

















// var nodemailer=require('nodemailer');

// module.exports.mail=(email)=>{
// var transporter=nodemailer.createTransport({
//     service : 'gmail',
//     auth:{
//         user: 'tripathisaurabh.311@gmail.com',
//         pass: '8931986659'
//     }
// });


// var mailOptions={
//     from : 'tripathisaurabh.311@gmail.com',
//     to: 'tripathishivam.311@gmail.com',
//     subject: 'Sending mail using node.js',
//     text: 'that was easy'
// };

// transporter.sendMail(mailOptions,function(error,info) {
//   if(error)
//   {
//       console.log(error);
//   }
//   else{
//       console.log('Email sent: '+ info.response);

//   }
//  })
// }



























































































































