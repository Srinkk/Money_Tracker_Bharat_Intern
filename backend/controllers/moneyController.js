const asyncHandler = require('express-async-handler')
const User = require('../model/User')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
require ('dotenv').config()

const setBudget = asyncHandler(async (req, res) => {
    const { email, amount } = req.body;

    try {
        const userDetailes = await User.findOne({ email }).exec();
        console.log(userDetailes);

        userDetailes.monthly_budget = amount;
        const updateUser = await User.findByIdAndUpdate(userDetailes._id, { monthly_budget: amount }, { new: true });

        if (updateUser) {
            return res.status(200).json(updateUser);
        }
        return res.status(400).json({ message: 'Some error occurred' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});



const getTotal = asyncHandler(async (req, res) => {
    const { email, amount } = req.body;
    let total_expense = 0;

    try {
        const userDetailes = await User.findOne({ email }).lean().exec();

        userDetailes.expense.forEach(element => {
            total_expense = total_expense + element
        });
        
        console.log(userDetailes.expense)
        console.log(userDetailes.monthly_budget)

         userDetailes.netWorth = userDetailes.monthly_budget - userDetailes.expense
        console.log(userDetailes.netWorth)
        
        const userUpdate = await User.findByIdAndUpdate(
            userDetailes._id,
            { $set: { expense: userDetailes.expense, netWorth: userDetailes.netWorth } },
            { new: true }
        );

        if (userUpdate) {
            return res.status(200).json(userUpdate);
        }

        return res.status(400).json({ message: 'Some error occurred' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports ={
    getTotal,
    setBudget
}