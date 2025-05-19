/*
Routing:
It is the way in which client requests are handeled by app end points

1. File based URL

Ex: www.nodeapp.com/index.html -- mapping the url with the physical file on the
server 
the index.html will be rendered in the web page

2.Resource based URL

Ex: www.nodeapp.com/Home  -- Here a request handler we send the response based
on the function or file
We create that request handler using routing

Routing:
1)Implementing different actions for different URL's
Ex: by creating functions

Route Parameter:

Ex: www.nodeapp.com/Product/101

101 is the id/parameter based on the id we get the product as a response

Ex: www.nodeapp.com/Books/Programming/js -- responds buy showing the books 

related to programming of Javascript

Query Strings: It is akey value pair like author(key)=john(value)

Ex: www.nodeapp.com/Books?author=john&id=101

& -- is used to separate two query strings

We write query strings after '?'

*/



