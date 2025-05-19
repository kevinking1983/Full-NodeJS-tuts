
const express = require('express');
const fs=require('fs');
const userRouter = require('./Routes/Authroutes')
const GlobalerrorHandler=require('./Controllers/errorcontroller');
const CustomError= require('./Utils/CustomError'); //importing our erro custom middleware class


const app= express();

app.use(express.json()); 


app.use('/api/v1/users',userRouter);


app.all('*',(req,res,next)=>{

    const err = new CustomError(`Can't find ${req.originalUrl} on the server!`,404);

    next(err);
    
    })
    
    //Global error handling middleware(here error is nothing but err which was passed in previous middlware)
    
    app.use(GlobalerrorHandler);// global error handler is shifted to controllers section
    


module.exports = app;
