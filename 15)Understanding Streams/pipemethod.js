/*

Back pressure - when is speed of reading is not equal to speed of writing stream

Ex: speed of reading stream = 4Mbps
    speed of writing stream = 3Mbps 

    here it is not equal

*/

const http= require('http');
const fs = require('fs');

let server= http.createServer();


server.on(response,(req,res)=>{

let res= fs.createReadStream('bigfile.txt');

res.pipe(res);  // Only available on readable streams

//Automatically controls the speed of data coming and speed of data going out
//no need to listen all the chunks using listeners all of it can be written in one line using .pipe


})











server.listen(8000,'127.0.0.1', () =>{

    console.log('server has started');
    
    
    })




