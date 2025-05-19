const http= require('http');
const fs = require('fs');

let server= http.createServer();

/*

In general method a lot of crashes may happen, continous loading of of data takes place

In streams data is sent chunk by chunk and continous loading does not take place

*/
// General method of rendering data
 

// server.on('request',(req,res) => {

// fs.readfile('bigfile.txt',(err,data)=>{

// if(err){

// res.end('Something went wrong');
// return;

// }
// res.end(data);

// })

// })

//Rendering data using streams

server.on('request',(req,res) =>{

let rs=fs.createReadStream('bigfile.txt');  // here the data is being read

rs.on('data',(chunk)=>{  // Here the data is listened chunk by chunk where whenever a new chunk is added data is updated with the new chunk

res.write(chunk);  // After adition of the new chunk the data is updated or written
res.end();         
})

rs.on('end',()=>{

    res.end(); // After the completion of reading the whole data it will end the process

    
    
    })


rs.on('error',(error)=>{

res.end(error.message);


})

})

server.listen(8000,'127.0.0.1', () =>{

    console.log('server has started');
    
    
    })