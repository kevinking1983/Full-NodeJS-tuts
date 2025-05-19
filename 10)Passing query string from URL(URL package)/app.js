

const http = require('http');
const fs = require('fs');
const url = require('url'); // we use this module to pass query strings 



const html = fs.readFileSync('index.html','utf-8');
let products = JSON.parse(fs.readFileSync('product.json','utf-8'));
let productlisthtml = fs.readFileSync('productlist.html','utf-8');


let producthtmlarray = products.map((prod) => {

let output = productlisthtml.replace('{{%IMAGE}}', prod.productImage);

output = output.replace('{{%NAME%}}', prod.name);
output = output.replace('{{%MODELNAME%}}', prod.modeName);
output = output.replace('{{%MODELNO%}}', prod.modelNumber);
output = output.replace('{{%SIZE%}}', prod.size);
output = output.replace('{{%CAMERA%}}', prod.camera);
output = output.replace('{{%PRICE%}}', prod.price);
output = output.replace('{{%COLOR%}}', prod.color);
output = output.replace('{{%ID%}}', prod.id); // here the id of the query string for each item is given 

return output;

})


const server= http.createServer((request, response) => {

/* Here we are parsing the query string in x. Now x is url object you can check it in log how it is
  
In the url object the pathname and query are the important properties

let x= url.parse(request.url, true)
   console.log(x);
   
   let path= request.url;
*/

/*Since path only takes /home or /products,etc we directly parse request.url in parse and save the returning object in a object destructuring
syntax
variables mentioned in object destructuring syntatx must match the properties in x(as of above)

*/

let {query,pathname:path} = url.parse(request.url, true);

  

if(path=='/' || path.toLocaleLowerCase()=='/home'){

    //this line should always come before response.end method
response.writeHead(200,{
    'Content-Type' : 'text/html',
    'My-header' : 'Hello,world'  //custom header, 200 is status code
});

   
response.end(html.replace('{{%CONTENT%}}', productlisthtml ));
}

else if(path.toLocaleLowerCase()=='/about'){

    response.writeHead(200,{
        'Content-Type' : 'text/html',
        'My-header' : 'Hello,world'  //custom header, 200 is status code
    });
    response.end(html.replace('{{%CONTENT%}}','This is about page'));

}

//Here we linking our JSON file
else if(path.toLocaleLowerCase()=='/products'){

    response.writeHead(200,{
        'Content-Type' : 'text/html',
        'My-header' : 'Hello,world'  //custom header, 200 is status code
    });


let productresponse = (html.replace('{{%CONTENT%}}',producthtmlarray.join(',')));
response.end(productresponse);
}

//We also can customize the respond based on the query with or without id as mentioned below (query.id checks the id of the query)
/*
if(!query.id){
let productresponse = (html.replace('{{%CONTENT%}}',producthtmlarray.join(',')));
response.end(productresponse);
}
else{

response.end('This is a product with ID = ' + query.id );

}

*/
   
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