let fs = require('fs');

/*

This is Non-blocking IO Model

Asynchronouls run 
Here the file is read asynchrounously while the file is being read in the
background the code proceeding to the next line on the main thread.

//callback function(err,data)=>{}
=>once the job of the readfile function is done the callback function is
triggered or passed to the main thread the data and 
error(specify 0 errors have occured) are passed are parameters


*/
fs.readFile('input.txt','utf-8',(err,data) =>{

console.log(data);

});

console.log('Reading file....');