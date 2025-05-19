const http= require('http');
const fs=require('fs');
const { error } = require('console');

const html=fs.readFileSync('gym3.html','utf-8')

/*
If a html file is linked to any ohter file as a port of it's 
code/body(photos,videos,styling,etc) server even calls those linked files
and downloads them to present to the user.

*/

//1. Creating a server

const server =http.createServer((request,response) => {

response.end(html);//this part will be shown to the user
//Here we server our html files and many such.

console.log('A new request is recieved');

});

//2. Starting the server

/* 
=> listens to the new requests
server.listen('__port no.__','___host___',)
local host-- 127.0.0.1('localhost'(route url) can also be used in the url bar)
*/

server.listen(8000,'127.0.0.1', () =>{

console.log('server has started');


})