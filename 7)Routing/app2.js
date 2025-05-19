const http = require('http');
const fs = require('fs');

const html = fs.readFileSync('index.html','utf-8');


const server= http.createServer((request, response) => {

   let path = request.url;

   //here path stores the request of the user Ex: /home,/about,etc

if(path=='/' || path.toLocaleLowerCase()=='/home'){

    //here the html file is rendered wiht a relplacement in content in body of the html file
response.end(html.replace('{{%CONTENT%}}','This is home page'));
}

else if(path.toLocaleLowerCase()=='/about'){

    response.end(html.replace('{{%CONTENT%}}','This is about page'));

}
else{

response.end('Error 404: Page not found!');

}


})


server.listen(8000,'127.0.0.1', () =>{

    console.log('server has started');
    
    
    })