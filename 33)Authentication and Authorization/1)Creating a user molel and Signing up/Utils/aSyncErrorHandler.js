//We are passing our create method handler function as an argument using func
module.exports = (func)=>{   // As our createmovie handler must only deal with the create method
    //than dealing with catch method to find error simuntaneously
    //we created a seperate error handler for catching errors for it
return(req,res,next)=>{                                    
func(req,res,next).catch(err=> next(err));  //when the function returns a rejected promise catch function
          //calls next(err) which calls global error handler function
}
}

