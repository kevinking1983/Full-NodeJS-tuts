

const http = require('http');
const fs = require('fs');
const url = require('url'); // we use this module to pass query strings 



const html = fs.readFileSync('index.html','utf-8');
let products = JSON.parse(fs.readFileSync('product.json','utf-8'));
let productlisthtml = fs.readFileSync('productlist.html','utf-8');
let productdetaillisthtml = fs.readFileSync('product-details.html','utf-8');



function replacehtml(template, product){

    let output = template.replace('{{%IMAGE}}', product.productImage);

    output = output.replace('{{%NAME%}}', product.name);
    output = output.replace('{{%MODELNAME%}}', product.modeName);
    output = output.replace('{{%MODELNO%}}', product.modelNumber);
    output = output.replace('{{%SIZE%}}', product.size);
    output = output.replace('{{%CAMERA%}}', product.camera);
    output = output.replace('{{%PRICE%}}', product.price);
    output = output.replace('{{%COLOR%}}', product.color);
    output = output.replace('{{%ID%}}', product.id); // here the id of the query string for each item is given 
    output = output.replace('{{%ROM%}}', product.ROM);
    output = output.replace('{{%DESC%}}', product.Description);
   

    return output;
    
    }
   


const server= http.createServer(); //event emmitter

// using server.on
server.on('request',(request, response) => {
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

//Without query id
if(!query.id){

    response.writeHead(200,{
        'Content-Type' : 'text/html',
        'My-header' : 'Hello,world'  //custom header, 200 is status code
    });

producthtmlarray= products.map((prod) => {

   return replacehtml(productlisthtml,prod);

})

    let productresponse = (html.replace('{{%CONTENT%}}',producthtmlarray.join(',')));
response.end(productresponse);
}
//with query id
else{
response.writeHead(200,{
        'Content-Type' : 'text/html',
        'My-header' : 'Hello,world'  //custom header, 200 is status code
    });

    // Here the iterator should only take the values of the concerned query id
    let prod= products[query.id];

    productdetailhtmlarray= replacehtml(productdetaillisthtml,prod);

let productdetailresponse = (html.replace('{{%CONTENT%}}',productdetailhtmlarray));
response.end(productdetailresponse);

}

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