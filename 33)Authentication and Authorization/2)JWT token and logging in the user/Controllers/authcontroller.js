const express = require('express');
const usermodel = require('../Models/usermodel');
const asyncErrorHandler = require('../Utils/aSyncErrorHandler');
const jwt = require('jsonwebtoken');
const CustomError= require('../Utils/CustomError');


// This our jwt token which is issued during login and has a time period of validity
const signtoken = id => {

                                 //Payload           Secret string            
       const token = jwt.sign({id:newuser._id}, process.env.SECRET_STR,{

    expiresIn: process.env.LOGIN_EXPIRES     // After the specified time the JWT will get expired
                                         // Time in milliseconds
                                })



}



exports.signuphandler = asyncErrorHandler(async (req,res,next) => {

const newuser = await usermodel.create(req.body);

 const token = signtoken(newuser._id);


res.status(201).json({

status: "Success",

token,

data: {

user: newuser

}

});


});


exports.login = asyncErrorHandler(async (req,res,next) => {


const useremail = req.body.email;

const userpassword = req.body.password;

if(!email || !password){

const error = new CustomError('Please provide Email and password for logging in',400);

return(error);

}

const verifyuser = await usermodel.findOne({email: useremail}.select('+password')) 
        // including password in response because we need for verification

        
const isMatch = await usermodel.ComparePassword(userpassword,verifyuser.password) // verfying password
                                                                         //by comparing it with password in DB

// Throw error if email or password are not valid                                                                         
if(!user || !isMatch){

const error = new CustomError('Incorrect email or password', 400);

return next(error);



}

// After all the verifications we are logging in the user by creating and sending a JWT

const token = signtoken(user._id);

res.status(200).json({

status: 'Success',

token: token,

})







})



