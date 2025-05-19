const express= require('express');
const fs = require('fs');
const moviescontroller=require('./../Controllers/moviescontroller')  // importin our controller module

const app= express();

let movies = JSON.parse(fs.readFileSync('movies.json'));




const Router= express.Router();  //Creating a router


Router.route('/')
            
             .get(moviescontroller.getAllmovies)
             .post((moviescontroller.createmovie))

Router.route('/:id') 

        .patch(moviescontroller.updatemovie)
        .delete(moviescontroller.deletemovie)


app.use('/api/v1/movies',Router);  //In this middleware the router we created is used only for the path we mention

module.exports= Router;