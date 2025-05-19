/*

PUT - when we make a specific change in an object after making the change we also need to send the rest of the properties after editing

PATCH -  only the change can be sent 

we use    .splice(____(index)____,____(no.of elements to delete)___)

*/

const fs = require('fs');

const express= require('express');

const app= express();

let movies = JSON.parse(fs.readFileSync('movies.json'));

app.use(express.json())

//PATCH REQUEST
app.patch('/api/v1/movies/:id',(req,res)=>{

let id= req.params.id*1;  // .params stores the values of route parameters in a string

let movietoupdate=movies.find(eL=>eL.id == id); // el is the iterator to access all objects and conditon is also mentioned

if(!movietoupdate){

    return res.status(404).json({
    
    status:"fail",
    message:"No Movie with ID '<id>' is found!"
    
    })

}
let movieindex = movies.indexOf(movietoupdate);  // index of stores the index of the movie we want to edit(indexing:0,1,2,3,.... like array)

Object.assign(movietoupdate,req.body);  /* Whatever edit we mention in the body of our request that will be changed 
                                                             in our selected movie */

movies[movieindex]=movietoupdate;

fs.writeFile('movies.json',JSON.stringify(movies),(err)=>{
    
    res.status(200).json({

    status:"success",     //JSON to Jsend JSON data
    data: {

        movie: movietoupdate
    }
});



})


})

//DELETE REQUEST

app.delete('/api/v1/movies/:id',(req,res)=>{

    let id= req.params.id*1;

    let movietodelete=movies.find(eL=>eL.id == id);

    if(!movietodelete){

        return res.status(404).json({
        
        status:"fail",
        message:"No Movie with ID '<id>' is there to delete"
        
        })
    
    }

    let movieindex = movies.indexOf(movietodelete);

    movies.splice(movieindex,1);

    fs.writeFile('movies.json',JSON.stringify(movies),(err)=>{
    
        res.status(200).json({
    
        status:"success",     //JSON to Jsend JSON data
        data: {
    
            movie: null
        }
    });
    
    
    
    })




})


const port=3000;
app.listen(port,()=>{


console.log('Server has started...');


})