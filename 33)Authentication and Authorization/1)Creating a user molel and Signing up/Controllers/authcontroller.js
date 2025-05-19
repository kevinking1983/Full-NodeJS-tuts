const express = require('express');

const usermodel = require('../Models/usermodel');

const asyncErrorHandler = require('../Utils/aSyncErrorHandler');




exports.signuphandler = asyncErrorHandler(async (req,res,next) => {

const newuser = await usermodel.create(req.body);


res.status(201).json({

status: "Success",

data: {

user: newuser

}

});


});






