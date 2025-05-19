const express = require('express');
const usermodel = require('../Models/usermodel');
const asyncErrorHandler = require('../Utils/aSyncErrorHandler');
const jwt = require('jsonwebtoken');
const CustomError= require('../Utils/CustomError');
const util = require('util');

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
                                                                         //this method was created in the models folder
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


exports.protect = asyncErrorHandler(async (req,res,next) => {

const testToken = req.headers.authorization;  // It is the JWT token sent by client as a header with name authoriztion

let token;


if(testToken && testToken.startsWith('bearer')){ // Checking if the auth header is starting with bearer

 token = testToken.split(' ')[1] ; //spliting the jwt token from the header and storing it in a var



}

if(!token){  // Throwing an error if token is not sent/alloted/undefined

next(new CustomError('You are not logged in!',401)) // 401 is an unauthorized user


}


console.log(token); //loging our token just to verify our code

// Verifying the token a storing the decoded token in a variable


const decodedToken= await util.promisify(jwt.verify)(token, process.env.SECRET_STR) // verifying our token
                                                            // and storing the decoded token in a var 
                                                                                                            

// Checking if the user exists (There is case if the admin deletes the user between the time JWT was issued)

const user = usermodel.findById(decodedToken._id);

if(!user){

next(new CustomError('The user with the given does not exist',401));


}

// Checking if password was changed after token was issued by the server after logging in

if(await user.isChangedPassword(decodedToken.iat)){ // The JWT token when decoded contains a field iat which stores the 
                                           // the timestamp the token was issued

const error = new CustomError('The password has been changed recently, Login again',401);

next(error);

}

// After all the verifications now the user can access the protected routes

req.user = user; // storing the verfied user in the request parameter to use in the further middlewares
next();




})
























