require('dotenv').config();
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PW,
    }
})

function sendMail(to,subject,text){
    const mailSetting = {
        from: process.env.USER_EMAIL,
        to,
        subject,
        text
    }

    transport.sendMail(mailSetting,(err,info) =>{
        if(err) console.log( err);
        else console.log("email sent");
    })
}

module.exports = sendMail;