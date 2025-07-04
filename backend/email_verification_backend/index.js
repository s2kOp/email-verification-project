require('dotenv').config();
const express = require("express");
const crypto = require('crypto');
const sendMail = require("./utils/mailer");
const cors = require("cors");
const db = require("./config/db");
const app = express();
const PORT =3000;

app.use(cors());
app.use(express.json());

app.post("/api/auth/register", (req,res) => {
    const {emailId} = req.body;
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 2*60*1000);
    db.query("INSERT INTO USERS(EMAIL) VALUES(?)",[emailId],(err,result) =>{
        if(err) return res.json({error:err});
        const userID = result.insertId;
        db.query("INSERT INTO VERIFICATION_TOKEN(USER_ID,TOKEN,EXPIRY) VALUES(?,?,?)",[userID,token,expiry],(err,result) =>{
            if(err) return res.json({error:err});
            const link = `http://localhost:3000/api/auth/verify-email?token=${token}`;
            sendMail(emailId,"EMAIL VERIFICATION",`Verify your email by clicking the link : ${link}`);
            console.log("User entered");
            res.json({ status: "success", message: "Email verification sent!" });
        })
    })      
})

app.get('/api/auth/verify-email', (req,res) => {
    const tokenToVerify = req.query.token;

    db.query("SELECT * FROM VERIFICATION_TOKEN WHERE TOKEN = ?",[tokenToVerify],(err,result) =>{
        if(err) return res.json({error: err});
        const user = result[0].USER_ID;
        if (result.length === 0 || result[0].EXPIRY < Date.now()) {
            db.query("DELETE FROM VERIFICATION_TOKEN WHERE TOKEN = ?",[tokenToVerify],(err,result) =>{
                if(err) return res.json({error: err});
            })
            db.query("DELETE FROM USERS WHERE ID = ?",[user],(err,result) => {
                if(err) return res.json({error: err});
            })
            return res.redirect(`http://localhost:5173/verification-fail`);
        }
        db.query("UPDATE USERS SET VERIFIED = TRUE WHERE ID = ?",[user], (err,result) => {
            if(err) return res.json({error: err});
            else return res.redirect(`http://localhost:5173/reset?token=${tokenToVerify}`);

        })
    })
})

app.post('/api/auth/reset-password', (req,res) => {
    const {tokenToVerify,password} = req.body;

    db.query("SELECT * FROM VERIFICATION_TOKEN WHERE TOKEN = ?",[tokenToVerify],(err,result) => {
        if(err) return res.json({error: err});
        const userId = result[0].USER_ID;

        db.query("UPDATE USERS SET PASSWORD = ? WHERE ID = ?",[password,userId],(err,result) => {
            if(err) return res.json({error: err})
        })

        db.query("DELETE FROM VERIFICATION_TOKEN WHERE USER_ID = ?",[userId],(err,result) =>{
            if(err) return  res.json({error: err})
            else return res.json({message: "successfully deleted"});
        })
    })
})

app.listen(PORT,() => {
    console.log(`Listening at localhost${PORT}`);
})