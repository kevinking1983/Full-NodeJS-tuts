

module.exports = function replacehtml(template, product){

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