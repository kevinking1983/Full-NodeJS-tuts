const { fail } = require('assert');
const fs = require('fs');
const Movie = require('./../Models/movieModel');
const CustomError= require('./../Utils/CustomError'); //importing our erro custom middleware class
const GlobalerrorHandler=require('./errorcontroller');
const asyncErrorHandler= require('./../Utils/aSyncErrorHandler');// importing our asyncerrorhandler funcn

// our asyncerrorhandler is utils folder check it out

exports.getAllmovies= async (req,res)=>{

    
    const movies= await Movie.find() ;    // same find in mongodb commands
    
    res.status(200).json({

status: 'Success',
length: movies.length,
data:{

    movies       //envelope
}

    });

}



exports.getmoviebyid= asyncErrorHandler(async(req,res,next)=>{

// const movie=Movie.find({_id:req.params.id});    
    const movie = await Movie.findById(req.params.id); // this also a method to find method

  //change2  

if(!movie){ // when id is similar and succes is the statud movies data field will be assigned null so
                                    //!null should be the if condition to correct such error

const error= new CustomError('Movie with that id is not found',404);

return next(error);



}



res.status(200).json({

    status: 'Success',
    length: movies.length,
    data:{
    
        movie       //envelope
    }
    
        });
    

    
    

})

// our asyncerrorhandler is utils folder check it out


// we removed try and catch after creating a seperate error handler for create method or async method
                                     // we are passing our create method function handler to our error 
                                       //  |              handler to check for errors
exports.createmovie= asyncErrorHandler( async (req,res)=>{

//   try{  
const movie = await Movie.create(req.body);

res.status(201).json({

status: 'success',
data:{

    movie
 }

})

})
 /* we need not use save here this will directly save the document
in the db with movie object being passed in it as "req.body" this will return a promise which can either be
a resolved one(document will be saved in the db) or error 

As it takes time to resolve we use to wait for the promise to get resolved
                              |
                  await and async as shown above
if use await async then we need to use try catch instead of this catch

*/
//  catch(err){

// const error= new CustomError(err.message,400);
// next(error);

//  }


   


exports.updatemovie= asyncErrorHandler(async(req,res)=>{

    
                                   //updates the document
const updatedmovie= await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true}) 
// new will make sure this method  will return the document
// runvalidators will make sure the input in body will run the through the validators(ex: unique in name)

//change2  

if(!updatedmovie){ // when id is similar and succes is the statud movies data field will be assigned null so
    //!null should be the if condition to correct such error

const error= new CustomError('Movie with that id is not found',404);

return next(error);



}


res.status(200).json({

status:"success",
data:{

    movie:updatedmovie
}


});

    
    })


    exports.deletemovie= asyncErrorHandler(async(req,res)=>{



                  //deletes the movie
    const deletedMovie=await Movie.findByIdAndDelete(req.params.id);

    if(!deletedMovie){ // when id is similar and succes is the statud movies data field will be assigned null so
        //!null should be the if condition to correct such error
    
    const error= new CustomError('Movie with that id is not found',404);
    
    return next(error);
    
    
    
    }


    res.status(204).json({

status:"success",

data:null


    })


})

//change

exports.getmoviestats = asyncErrorHandler(async (req,res) =>{

const stats= await Movie.aggregate([

// these are stages

{$match: {ratings:{$gte:7}}},  // now each movie doc will go throught this condition in aggregation pipeline
                              // and the satisfied documents are sent in result


{$group: {            // group stage works on all the documents returned by match stage if id is null
    
    _id:'$duration',         // grouping is done based on the duration field
avgRating: {$avg:'$ratings'},  // returns average rating in the collection
avgprice:{$avg:'$price'},      // returns average price in the collection
minprice:{$min:'$price'},      // returns min value of price in the collection
maxprice:{$max:'$price'},       // returns max value of price in the collection
pricetotal:{$sum:'$price'},      //returns sum all the prices in the collection
moviescount:{$sum:1}             // for each doc passed in the pipeline moviecount++ happens

}} ,                             
{$sort:{maxprice:1}},         // sorting is done on the data which goes through match and group

// {$match:{maxprice:{gte:10}}}


]);  // with this we can utilize the aggregrate feature of mongodb

res.status(200).json({

    status:"success",
    length:stats.length,
    data:{
    
        stats
    }
})





})

exports.getmoviesbygenre = asyncErrorHandler(async (req,res) => {

    const genre= req.params.genre;

const movies= await Movie.aggregate([

{$unwind:'$genres'},  // check notes

{$group:{

    _id:'$genres',
    moviecount:{$sum:1},      //grouping data by genre noting 
movies: {$push: '$name'}      //noting all the movies which contain that particular genre
}},

{$addFields:{genre:"$_id"}}, // assinging id field poperty to a new field genre
{$project:{_id:0}},   // by setting any field to 0 all docs will be displayed excluding the field mentioned
                     //here as genre impact on the field is same as that of _id so we are removing _id
                     //if any fields are set to 1 all docs will be displayed with only the field set to
                     // 1 in the project

{$sort:{moviecount:-1}}, // if value is set to 1 then A.o if -1 D.O

// {$limit:6}  // displays as many docs as mentioned in the value

{$match:{genre:genre}}



])



    res.status(200).json({

        status:"success",
        length:movies.length,
        data:{
        
            movies
        }
    })





})