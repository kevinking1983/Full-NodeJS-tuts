/*

To use a middleware we need to mention  app.use(express.json());

In a midlleware function these are the following parameters

function(__request__,__respond___,___next___)





*/

const express= require('express');
const fs=require('fs');

let movies = JSON.parse(fs.readFileSync('movies.json'));

const app= express();

const logger= function(req,res,next){

    console.log('Custom middleware called');
    
    next();
    
    }
    
    
    app.use(express.json());  // express.json() stores a middleware function which is called from express module
    app.use(logger);        //custom middleware 

    //Midlle ware example 
    app.use((req,res,next)=>{

    req.requestedAt= new Date().toISOString();      //toISOString() helps to convert into a string
    next();
})

const getAllmovies= (req,res)=>{

    res.status(200).json({
    
        status:"success",     //JSON to Jsend JSON data
        requestedAt: req.requestedAt, // Value created due to our custom(example) middleware
        count: movies.length,  //Mention this based on the type of content her no. of movie objects should be mentioned
        data: {
    
            movies: movies
        }
    
    });
}

const createmovie= (req,res)=>{

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

}

const updatemovie= (req,res)=>{

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
    
    
    }

const deletemovie=(req,res)=>{

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




}
app.route('/api/v1/movies')
            
             .get(getAllmovies)
             .post((createmovie))

app.route('/api/v1/movies/:id') 

        .patch(updatemovie)
        .delete(deletemovie)


const port = 3000;

app.listen(port,()=>{


    console.log('Server has started');
})