/*

---------------------------------------Things we learnt---------------------------------------------------

1. Hashing/encrypting our password using bcrypt module 

Hashing is done before saving the model using .pre method of mongoose middlewares

Hashing - a manual or automated string(salt) will be added to password

.hash(_nameofproperty_, _cost_) - Higher the cost higher the quality of encryption 


*/