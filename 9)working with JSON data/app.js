/*
JSON file
Json is a file where we store data in the format like a javascript object(the differnce is the property name is writen btw "")

=> Data is stored in the form of JSON inside a database like mongodb, So this data will be converted into js object while using it from the 
database.


*/


const http = require('http');
const fs = require('fs');

const html = fs.readFileSync('index.html','utf-8');
let products = JSON.parse(fs.readFileSync('product.json','utf-8'));
let productlisthtml = fs.readFileSync('productlist.html','utf-8');

/* __(JSON file)__ . map((prod) =>{

Here changes are made using __(HTML file)___.replace('__(variable in html file where we want to change)__','prod.___(object we want to use)__)


}

1)Here .map runs like a loop where each object in JSON file is iterated where prod acts like an iterator and 
returns the fully read object and will be assigned to the variable(to this changes are made using callback) 


2)now producthtmlarray is a html file where a html code for each product(as mentioned in JSON file) is written 
separetly inside it

3)to make the code collective we use   ___(producthtmlarray)___ .join(,) [, is the seperator]


*/
let producthtmlarray = products.map((prod) => {

let output = productlisthtml.replace('{{%IMAGE}}', prod.productImage);

output = output.replace('{{%NAME%}}', prod.name);
output = output.replace('{{%MODELNAME%}}', prod.modeName);
output = output.replace('{{%MODELNO%}}', prod.modelNumber);
output = output.replace('{{%SIZE%}}', prod.size);
output = output.replace('{{%CAMERA%}}', prod.camera);
output = output.replace('{{%PRICE%}}', prod.price);
output = output.replace('{{%COLOR%}}', prod.color);

return output;

})


const server= http.createServer((request, response) => {

   let path = request.url;
   
   //here path stores the request of the user Ex: /home,/about,etc

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
//the JSON file is logged into the console here
//  console.log(producthtmlarray);

}
//As here for each request the file is being read each time so to ride file once and use multtiple times we are using readfilesync above
// fs.readFile('product.json','utf-8',(error,data) =>{

//     //using parse we convert json to js object
// let products=JSON.parse(data)
//  response.end(data);

// })


   
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