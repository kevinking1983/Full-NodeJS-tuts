/*

// express module 

const app = express();  --  Here app stores all the objects when express fuction is called

we used:

app.get/post/patch/delete('(_pathname_)',(req,res)=>{

//Jsend response

})

app.get/post/patch/delete('(_pathname)',_(route handler function)_)

// Route Handler (is also a middleware)

Used for requests which have same paths but different type of request

app.route(_(common pathname)_) (directly rounting our app)

       .get/post/patch/delete(_route handler function_)
                   .
                   .
                   .
           (as many type of requests we want)

//Router      (approuter) (used for same paths but different end parameters in the path as in Step2)
              (mounting routes)
Ex: 

Step 1: creating a router      const Routervar = express.Router();  

Step 2: assign all the routes to our router     

RoutervaR.route('/')
            
             .get(getAllmovies)
             .post((createmovie))

Routervar.route('/:id') 

        .patch(updatemovie)
        .delete(deletemovie)

Step 3: Activating router as middleware

app.use('_common path_',Routervar) Ex: /api/v1/movies

If any middleware function needs to acess route parameter we can add the 4th parameter(value) (req,res,next,value)
 to access it value stores the route parameter(id)

can check param middleware which related to it but we use it as 
Routervar.param('_route parameter we want to access_',(req,res,next,value)=>{}




//Middleware

app.use(express.json()) // this is a middleware(function to modify incoming request data btw req and respond) (must mention when we use middlewares)

app.use((req,res,next)=>{})  or app.use(_middleware function_)

//Middleware example ( shows requested date)
app.use((req,res,next)=>{

    req.requestedAt= new Date().toISOString();      //toISOString() helps to convert into a string
    next();
})

we also used morgan middleware function app.use(morgan('dev'))   for different parameters we can access
                                                              different middleware functions
provides info about request

// Chaining middleware

if we want to use middleware only for certain requests then we chain middlewares to that route

Ex: Routervar.route('/')
              
              .get(_route handler function 1)
              .post(_chain middleware function_,_route handler function 2_)
             



//Serving a static file - app.use(express.static(_location of static file_))

Here we use this middleware when a user wants to access a file which has not routes  

Whenever the user types a url other than the valid routes the server checks if it is relevant/related route
to access the static file

Ex:

app.use(express.static('./public'))          public is static folder

URL localhost:3000/templates/demo.html (must not mention the static directory in the url)


// Route parameter

localhost:3000/api/v1/movies/:id

Route parameter is the segment of the url that is used capture the values specified at their position in the URL(Ex: id)

To indicate a route parameter in the URL we need specify  :  before it


req.params.id is going store and object which stores the value(stored in the form of string) of route parameters which is
one of the property of req

We should use ? if mentioning a route parameter is optional

movies.id*1  [Both methods will turn string value to numeric]
+movies.id


// Folder format

1. app.js

Contains middlewares, activation(step 3) of Router

2. server.js

Event listner, Connection to data base using our environemnt variables

3. Controllers

Cotains all the route/event handler functions

4. Routes

Contains step1 and step2 of router, must export Router to activate in app

5. Models

Contains Schema related to our app , middlewares realted to MongoDB


*/