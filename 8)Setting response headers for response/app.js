/* 200 status code means success
   404 status code stands for resource not found

writehead()- sets status code,headers


*/




const http = require('http');
const fs = require('fs');

const html = fs.readFileSync('index.html','utf-8');


const server= http.createServer((request, response) => {

   let path = request.url;
   
   //here path stores the request of the user Ex: /home,/about,etc

if(path=='/' || path.toLocaleLowerCase()=='/home'){

    //this line should always come before response.end method
response.writeHead(200,{
    'Content-Type' : 'text/html',
    'My-header' : 'Hello,world'  //custom header, 200 is status code
});

   
response.end(html.replace('{{%CONTENT%}}','This is home page'));
}

else if(path.toLocaleLowerCase()=='/about'){

    response.writeHead(200,{
        'Content-Type' : 'text/html',
        'My-header' : 'Hello,world'  //custom header, 200 is status code
    });
    response.end(html.replace('{{%CONTENT%}}','This is about page'));

}
else{

    response.writeHead(404,{
        'Content-Type' : 'text/html',
        'My-header' : 'Hello,world'  //custom header, 200 is status code
    });
response.end('Error 404: Page not found!');

}


})


server.listen(8000,'127.0.0.1', () =>{

    console.log('server has started');
    
    
    })