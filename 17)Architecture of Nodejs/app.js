
const fs= require('fs');

   console.log('Program has started');

//Stored in 1st phase
 setTimeout(()=>{

console.log('Timer callback executed');

 },0);


 //Stored in 3rd phase    SetImmediate is a special timer that expires before any timer
setImmediate(()=>{

console.log('SetImmediate callback executed');

//nexttick queue
process.nextTick(()=>{

   console.log('process.nextTick is executed');
})


})



//STORED- 2nd PHASE  (Once the file is read then the callback is pushed to the second phase)(mostly will be read in 2nd tick)

fs.readFile('input.txt',()=>{

console.log('Read file completed');



})



   console.log('Program has ended')