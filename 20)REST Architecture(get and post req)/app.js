
// .parse => JSON to js object
// .stringify => js object to JSON
// status code 201 for created


const express= require('express');
const fs=require('fs');

let movies = JSON.parse(fs.readFileSync('movies.json'));

const app= express();


app.use(express.json())  // this is a middleware(function to modify incoming request data btw req and respond)

//GET REQUEST
app.get('/api/v1/movies',(req,res)=>{

res.status(200).json({

    status:"success",     //JSON to Jsend JSON data
    count: movies.length,  //Mention this based on the type of content her no. of movie objects should be mentioned
    data: {

        movies: movies
    }
});


});


//POST REQUEST
app.post('/api/v1/movies',(req,res)=>{

// console.log(req.body);  // to send the body from the user to the server we need middleware

const newId= movies[movies.length-1].id+1; //Id of new object

const newMovie = Object.assign({id:newId},req.body);  //  Whatever data we entry in the body of our request that will stored in a variable

movies.push(newMovie);  // adding our new movie into the js object file using    __(JSON file)__.push

fs.writeFile('movies.json', JSON.stringify(movies),(err)=>{

res.status(201).json({

    status:"success",     
    count: movies.length,  
    data: {

        movies: newMovie
    }
});

});

// res.send('created');



})


const port = 3000;

app.listen(port,()=>{


    console.log('Server has started');
})