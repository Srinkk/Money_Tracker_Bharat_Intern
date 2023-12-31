const asyncHandler = require('express-async-handler')
const User = require('../model/User')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
require ('dotenv').config()



// @desc createNewUser
// route POST /user
// access Private

const createNewUser = asyncHandler(async(req,res)=>{
    const {email, f_name, l_name, password} = req.body

    const dup_user = await User.findOne({email}).lean().exec()

    if(dup_user)
    {
        return res.status(203).json({message : 'This email is already registered with us'})
    }
    const hashPWD = await bcrypt.hash(password, 10)
    const newUser = {email, f_name, l_name, password : hashPWD, monthly_budget: 0, netWorth : 0}
    
    const user = await User.create(newUser)
    if(user)
    {
        return res.status(200).json({message : 'New User created',user})
    } 
    else {
        return res.status(400).json({message : 'There is some error'})
    }
    
})

// @desc createNewUser
// route POST /user/login
// access Private
const getUser = (asyncHandler(async(req,res)=> {
    const {email, password} = req.body;

    const userExists = await User.findOne({email : email}).lean().exec();
    if(!userExists)
    {
        return res.status(400).json({message : "This email is not registered with us"})
    }
    const match = await bcrypt.compare(password,userExists.password)
    if(!match)
    {
        return res.status(400).json({message : 'Incorrect email or passsword'});
    }
    return res.status(200).json({userExists})   
}))
const sendEmail  = asyncHandler(async(req, res)=>{
    const {email}  = req.body;
    console.log(email)
    let transporter = nodemailer.createTransport({
        host : process.env.SMTP_HOST,
        port:  process.env.SMTP_PORT, 
        secure: false,
        auth:{
            user : process.env.SMTP_MAIL,
            pass : process.env.SMTP_PASSWORD,
        }
    });


    var mailOptions = {
        from : process.env.SMTP_MAIL,  
        to: email,
        subject: 'nodemailer checking',
        message: 'This is a testing mail',
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error)
        }else {
           return res.status(200).json({message : "Email sent successfully"});
            
        }    
    })
})

const getUserInfo = asyncHandler(async(req,res)=>{
    const {email} = req.body;

    const user =  await User.findOne({email}).exec()
    if(!user)
    {
        return res.status(400).json({message : 'No user exists with this email'})
    }
    if (user.monthly_budget === 0)
    {
        return res.status(201).json(user)
    }
    else {
        return res.status(200).json(user)
    }
})


module.exports = {
    createNewUser,
    getUser,
    sendEmail,
    getUserInfo
}


