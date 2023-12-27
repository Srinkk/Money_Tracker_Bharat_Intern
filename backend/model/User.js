const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    f_name : {
        type : String,
        required : true
    },
    l_name : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    monthly_income : {
        type : Number,
        default : 0
    },
    expense : {
        type : Number,
        default : 0
    },
    netWorth : {
        type : Number,
        default : 0
    }
})

module.exports = mongoose.model('User',userSchema)