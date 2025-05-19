/*
=> STEP 1: Separate API's into logical resources


https://Proacademy.com/addMovie
                                   (Examples for API)
                      /getMovies(This API displays movies)
                      /updateMovies
                      /deleteMovies(This API deletes movies)
                      /getMoviesByUser
                      /deleteMoviesByUser
                      

=> STEP 2: Expose structure,resource based URL

Endpoints should alwyas contain resources(noun[home,about,etc]) and use http methods for action.
       
=> STEP 3: Use HTTP methods

            (Http method)
/getMovies -->   GET  /Movies/21(ID to access about specific movie)  [Read]  [rendering server to clien]

/addMovies -->   POST  /Movies                                      [Create] [Sending from client to server]

/updateMovie --> PUT  /Movies/21
             |                                                       [Update]  [Update an existing resource]
             |---> PATCH  /Movies/21
    
             
/deleteMovie --> DELETE  /Movies/21                                   [DELETE]  [Delete an resource]           


CRUD Usage example

/getMoviesByUser --> GET /users/23/Movies/      Renders all movies of user id 23

/getMoviesByUser --> DELETE /users/23/Movies/6  Delets movie of id 6 of the user id 23

=> STEP 4: Send JSON data in response

JSON Data to Jsend JSON Data[Same as JSON data but a little more properties are added to it]

also called as enveloping it used to mitigate some securiy issues and other problems


=> STEP 5: API must be stateless

**The server should not have to remember previous request.

nextPage=currentpage+1
Send(nextPage)

Ex: Now when we are requesting next page stateless helps such that the current page request need not be remembered to take client to next page

[Ex: LoggedIN or not, currentPage]

*/