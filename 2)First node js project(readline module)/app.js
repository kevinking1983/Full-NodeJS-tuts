//enter node file name to start and run the nodejs file

/*readline is a module which returns an object that is stored in the constant 
readline
this module provides us an interface to read inputs from the terminal

*/


const readline = require('readline');

// here rl is an interface where it takes an input gives an output
const rl = readline.createInterface({

    input: process.stdin,
    output: process.stdout

});

rl.question("please enter your name:" , (name)=> {

    console.log("You entered: "+name);
// closes the interface after the use of rl(event)
rl.close();

})

// on method(_interface name__.on('__event___'))

rl.on('close',() =>{
    
    console.log("Interface closed");

    process.exit(0);//return with 0 errors
})