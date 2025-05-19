
const fs = require('fs');

const express= require('express');

const app= express();

app.use(express.json())

/*

localhost:3000/api/v1/movies/:id

Route parameter is the segment of the url that is used capture the values specified at their position in the URL(Ex: id)

To indicate a route parameter in the URL we need specify  :  before it


req.params.id is going store and object which stores the value(stored in the form of string) of route parameters which is
one of the property of req

We should use ? if mentioning a route parameter is optional

movies.id*1  [Both methods will turn string value to numeric]
+movies.id

movies.find
itreates the JSON object using an iterator and returns the value which match to the condition given by the user




*/
let movies = JSON.parse(fs.readFileSync('movies.json'));

app.get('/api/v1/movies',(req,res)=>{

    res.status(200).json({
    
        status:"success",     //JSON to Jsend JSON data
        count: movies.length,  //Mention this based on the type of content her no. of movie objects should be mentioned
        data: {
    
            movies: movies
        }
    });
    
});

app.get('/api/v1/movies/:id/:name?/:x?',(req,res)=>{


    console.log(req.params); // .params stores the values of route parameters in a string

    const id= req.params.id*1;  // string to integer

let movie = movies.find(eL=>eL.id == id) // el is the iterator to access all objects and conditon is also mentioned

if(!movie){

return res.status(404).json({

status:"fail",
message:"Movie with ID '<id>' is not found!"

})


}



//Sending movies that matches the id in response
res.status(200).json({

    status:"success",     //JSON to Jsend JSON data
    data: {

        movie: movie
    }
});




// res.end('Test response');


})



const port=3000;
app.listen(port,()=>{


console.log('Server has started...');


})