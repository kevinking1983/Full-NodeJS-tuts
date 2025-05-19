/*

In "start" property of our package.json file if we assign it with nodemon server.js then on typing npm start the server will start


*/

const dotenv = require('dotenv');
dotenv.config({path: './config.env'}); //accessing our environment variables

const app = require('./app'); 

const port = process.env.PORT || 3000;

console.log(process.env);

app.listen(port,()=>{


    console.log('Server has started');
})