
const http = require('http');
const fs = require('fs');

const html1 = fs.readFileSync('home.html','utf-8');
const html2 = fs.readFileSync('about.html','utf-8');

const server= http.createServer((request, response) => {

   let path = request.url;

   //here path stores the request of the user Ex: /home,/about,etc

if(path=='/' || path.toLocaleLowerCase()=='/home'){

response.end(html1);
}

else if(path.toLocaleLowerCase()=='/about'){

    response.end(html2);

}
else{

response.end('Error 404: Page not found!');

}


})


server.listen(8000,'127.0.0.1', () =>{

    console.log('server has started');
    
    
    })