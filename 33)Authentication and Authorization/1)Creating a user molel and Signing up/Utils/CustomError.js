
//Creating a custom error class which is also using the features of our built in error class

class CustomError extends Error{

constructor(message,statusCode){

super(message); //constructor of our inherited class

this.statusCode=statusCode;
this.status = statusCode >=400 && statusCode<500 ? 'fail' : 'error'; //status between 400 to 499 code is fail
                                                                    //or else it error

this.isOperational=true; // this class is only for opertational errors

Error.captureStackTrace(this,this.constructor); // the error class automatically detects where the error has occured

}



}

//The way we call our constructor of the class

//const error= new CustomError('some error message',404)


module.exports= CustomError;