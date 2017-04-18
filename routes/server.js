/**
 * Created by tiffanyraill on 2017-03-28.
 * This page is the configuration for email functionality
 * I have created an email address that the app sends all email to.
 * It has been tested and is functional. Note: there is no subject line.
 */
var express = require('express');
var nodemailer = require("nodemailer");
var router = express.Router();
/*
 Here we are configuring our SMTP Server details.
 SMTP is mail server which is responsible for sending and receiving email.
 */
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: 'testCOMP2068@gmail.com',
        pass: 'K104389896'
    }
});

/*------------------Routing Started ------------------------*/

router.get('/',function(req,res){
    res.sendfile('index.ejs');
});


router.post('/send',function(req,res){
    console.log(req.body)
    var mailOptions={
        name: req.body.name,
        to: 'testCOMP2068@gmail.com',
        email: req.body.email,
        subject: req.body.subject,
        text: req.body.comments
    };
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.render('index', {
                    message: 'Error - Email not sent'
                }
            );
        }else{
            console.log("Message sent: " + response.message);
            res.render('index', {
                    message: 'Message Sent!'
                }
            );
        }
    });
});


//Sends a copy to the user
// router.post('/send',function(req,res){
//     console.log(req.body)
//     var mailOptionsUser={
//         name: req.body.name,
//         to: req.body.email,
//         email: 'testCOMP2068@gmail.com',
//         subject: req.body.subject,
//         text: "This email is a copy for record purposes \n \n" +  req.body.comments
//     };
//     console.log(mailOptionsUser);
//     smtpTransport.sendMail(mailOptionsUser, function(error, response){
//         if(error){
//             console.log(error);
//             res.render('index', {
//                     message: 'Error - Email not sent'
//                 }
//             );
//         }else{
//             console.log("Message sent: " + response.message);
//             res.render('index', {
//                     message: 'Message Sent!'
//                 }
//             );
//         }
//     });
// });

module.exports = router;
