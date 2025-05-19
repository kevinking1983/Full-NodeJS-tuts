
const mongoose= require('mongoose');

const validator= require('validator');

const bcrypt= require('bcryptjs');

const userSchema = new mongoose.Schema({

name: {
    type: String,

    required: [true,'Please enter you name']
},

email: {

type: String,

required:[true, 'Please enter your email'],

unique: true, // no 2 users will have the same email

lowercase: true, // convert email to lower case when saving into database

validate: [validator.isEmail,"Please enter a valid email"]  // checks if email is valid


},

photo: String ,  //Path of the photo will be saved in the server directory


password: {

type: String,

required: [true, 'Please enter a password'],

minlength: 8 ,

select:false  // this property will not be displayed when a response object is served

},

confirmedPassword: {

type:String,

required:[true,"Please confirm your password"],

validate: {          // validation for conforming password

// Will only work for save and create methods

validator: function(vaL){

return vaL == this.password

},

message: 'Password & Confirm Password does not match!'

}


}

})

userSchema.pre('save', async function(next){

if(!this.isModified('password')) return next(); // Only if password property is changed/modified the only encryption will be done


this.password= await bcrypt.hash(this.password,12);

this.confirmedPassword= undefined;

next();

})

// We are creating a Custom method to verify password of user with password in DB

userSchema.methods.ComparePassword = async function(paswd,paswdDB){

   return await bcrypt.compare(paswd,paswdDB);

}





const User = mongoose.model('User',userSchema);

module.exports=User;