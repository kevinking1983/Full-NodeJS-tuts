events = require('events');

/*

extends -- Syntax for inheriting
super(); -- Used to call constructor of base class

*/


module.exports= class extends events.EventEmitter{

    constructor(){

        super();
    }


}