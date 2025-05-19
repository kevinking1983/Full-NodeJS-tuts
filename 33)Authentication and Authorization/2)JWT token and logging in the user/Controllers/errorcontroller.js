const CustomError=require('./../Utils/CustomError');


const devErrors= (res,error)=>{      // response for development environment

    res.status(error.statusCode).json({
    
        status:error.statusCode,
        
        message:error.message,
        
        stackTrace:error.stack,
    
        error: error
        
        
        });

//cast error
const castErrorHandler = (err)=>{

const msg = `Invalid value ${err.value} for field ${err.path}`

return new CustomError(msg,400);


}

//duplicate key error

const duplicateKeyErrorHandler = (err)=>{

    const name = err.keyValue.name;
    const msg = `This is already a movie with name ${name} please use another name`;

    
    return new CustomError(msg,400);


}


}

//validation error

const validationErrorHandler = (err)=>{


const errors=Object.values(err.errors).map(val => val.message); // contains all the values which contain errors in the 
                                                 //object(it is nothing but the response of development env error handler)

const errormessages= error.join('. ')
const msg=`Invalid input data:${errormessages}`

new CustomError(msg,404);

}


const prodErrors= (res,error)=>{    // response for production environment

    if(error.isOperational){
    res.status(error.statusCode).json({ // response for operational error
    
        status:error.statusCode,
        
        message:error.message

    });
    }
    else{                                 // response for non operational error
        res.status(error.statusCode).json({
status:'error',
message:'Something went wron plaase try again later'

        })
    }


}




module.exports= (error,req,res,next)=>{

    error.statusCode=error.statusCode || 500;
    
    error.status=error.status || 'error';
    
if(process.env.NODE_ENV=='development'){    //As we want the user to know very less info by the erro
                                            //for security issues we give more info about it in
   devErrors(res,error);                    //development environment and less info in production environment
  
    
}

else if(process.env.NODE_ENV=='production'){ 

// info about error we get in development mode but we are improvising that info for better understanding to the user

//Invalid ID cast error
if(error.name=='CastError'){

error=castErrorHandler(error);

}

//duplicate key error
if(error.code=11000){

error=duplicateKeyErrorHandler(error);

}

//validation error
if(error.name='ValidationError'){

    error=validationErrorHandler(error);
    
    }



prodErrors(res,error);
  

}

    
    }