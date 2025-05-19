/*

---------------------------------------Things we learnt---------------------------------------------------

// Hashing/encrypting our password using bcrypt module  (#bcrypt package)

Hashing is done before saving the model using .pre method of mongoose middlewares

Hashing - a manual or automated string(salt) will be added to password


#bcrypt package
.hash(_nameofproperty you want to hash_, _cost_) - Higher the cost higher the quality of encryption 


// Authentication using JWT token (#jsonwebtoken package)

1. POST request is sent by client to server by sending mail and password

2. Server verifies the request by checking if the login info matches with the user data in db

3. After verification means if user exists and password is correct a "JWT token, Secret String" are created 

4. The JWT token will be sent back to the client which will either be stored in cookie or a local storage

5. As soon as the client receives the JWT token that means he is logged in

6. Whenever a client wants to access any protected route after logging in, then the client sent the
   JWT token with the request like and id proof

7. Server verfies the JWT token if it is valid or not

8. If the JWT token is valid the requested data for the protected route will be sent back to the client

9. All the client requests are sent in protected using https

// Authentication for acessing protected routes after logging in

=> This is an understanding of the point 8 above of how that validation/authentication takes place

1. when JWT token is sent the server takes the header and payload part of the token and combines it 
   with the secret string to create a test signature

2. If the test signature matches with the signature inside the token then the user will be authenticated
    to get data of protected routes

3. Mainly used such that Header and Payload data is not tampered 


// A JWT token is divided into 3 parts (as in the picture)

1. Header - It is Json data which is encoded not encrypted and when we decode it is JSON data
            which contains the meta data about the token containing it's type and algorithm used

2. Payload - It is the data we want to encode bigger the Payload bigger the encoded string


3. Signature - Made from header,payload and the Secret string which was created and stored in the server
               

# jsonwebtokenpackage

.sign(_Payload_,_secret string_)

Ex: .sign




*/