const asyncHandler = require('express-async-handler')
const User = require('../model/User')
const bcrypt = require('bcrypt')

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
    const newUser = {email, f_name, l_name, password : hashPWD, monthly_income: 0, expense: 0, netWorth : 0}
    
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

module.exports = {
    createNewUser,
    getUser
}


