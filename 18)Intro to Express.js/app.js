
const express= require('express');

const app= express(); //app stores all the objects when the express function is called

const port=3000;

/*whenever a get request is made one the specefied route url that specific call back function will be triggered

res.status(__(status code)__).   res.send('___(html/txt file)___') (like res.end)

res.status(__(status code)__).   res.json('___(json file)___')  for sending json response


app.post for post request

*/

app.get('/',(req,res)=>{

    // res.status(200).send('Hello from the server');

    res.status(200).json({message:'Hello world', status: 200});

})

app.post('/',()=>{

 
})


//Here the server the server is created and started in one command
app.listen(port,()=>{

console.log('Server has started...');

})
