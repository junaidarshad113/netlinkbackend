const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
username: {
  type: String ,
  unique: true,
  required: true,
},
cnic: {
  type:  Number ,
  required: true,
  unique:true,
  match: [
    /^[0-9]{5}(-[0-9]{7})(-[0-9]{1})$/,
    "Please fill a valid Cnic number",
  ],
},
email: {
  type: String,
  required: true , 
  lowercase: true,
  unique: true,
  match: [
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    "Please fill a valid email address",
  ],
},
password: {
  type: String,
  required: true ,
  match: [
    /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/,
    "Please fill a valid password",
  ],
},
phone_no: {
  type: Number , 
  required: true,
  match: [
    /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/,
    "Please fill a valid phone no",
  ],
},
address:{
  type: String,
  required: true
},

avatar: {
  type: String 
}
});

const user = mongoose.model("user", userSchema);
module.exports = user;
