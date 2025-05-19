/*

In "start" property of our package.json file if we assign it with nodemon server.js then on typing npm start the server will start


*/


const app = require('./app');

const port = 3000;

app.listen(port,()=>{


    console.log('Server has started');
})