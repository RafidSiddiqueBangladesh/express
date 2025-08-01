const mongoose=require('mongoose');
const bcrypt=require("bcrypt");
const validator=require("validator");

const Schema=mongoose.Schema;
const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },  password:{
        type:String,
        required:true,
        
    },
});

userSchema.statics.signup=async function (email,password){

//validator
if(!email||!password){
    throw Error('All field must be filled');
}
//lower,upper,symbol,min8 character
if(!validator.isEmail(email)){
    throw Error("Invalid email");
}

if(!validator.isStrongPassword(password)){
    throw Error('password is not strong ,try to combine uppercase loweracase,min 8 character,special  and number')
}

    const exist=await this.findOne({email}) ;
    if(exist){
        throw Error("Email Already used");
    }
    


//bcrypt and encrypt
const salt=await bcrypt.genSalt(10);
const hash=await bcrypt.hash(password,salt);

//create an user
const user=await this.create({email,password:hash});
return user;
};
 

module.exports=mongoose.model("User",userSchema);