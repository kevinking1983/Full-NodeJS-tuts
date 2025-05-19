
//using fs module
const fs = require('fs');

//readFileSync('__file location___','__encoding__')

let textIn = fs.readFileSync('input.txt','utf-8');
 /*
 Synchronous Reading
 only afer reading all files the code proceeds to next line

*/
//console.log(textIn); //prints the content

let content = `Data read from input.txt: ${textIn}\n Date created${new Date()}`


//fs.writerFileSync('__file location__','___content___')-- to write content in a file

fs.writeFileSync('output.txt',`${content}`); /*even if our output.txt file is not
present in the website but is mentioned in the file path the file is automatically
created with the content we wanted write.*/

