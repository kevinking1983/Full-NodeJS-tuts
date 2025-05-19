
const events = require('events');

const user = require('./inheriting eventEmitter class into a custom class/user'); // importing our inherited class
/*

eventemitter is a class to create a instance of this class we need to call it's constructor

So, myemitter is storing an instance of eventemitter class

****
Whenever we are using replacers in console.log use ` `



*/

let myemitter = new events.EventEmitter();
// let myemitter = new events.user();  The inherited class also works


// listening to our event here
myemitter.on('userCreated', (id,name) => { 

console.log(`a new user ${name} with ID ${id} is created`);

})
myemitter.on('userCreated', (id,name) => {

    console.log(`a new user ${name} with ID ${id} is added in database`);
    
    })

myemitter.emit('userCreated',101,'Ben'); //emmiting our event hear