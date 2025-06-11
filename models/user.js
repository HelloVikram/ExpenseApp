const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userSchema=new Schema({
   username:{
      type:String,
      required:true
   },
   email:{
      type:String,
      required:true,
      unique:true
   },
   password:{
      type:String,
      required:true
   },
   ispremium:{
      type:Boolean,
      required:true,
      default:false
   },
   totalexpenses:{
      type:Number,
      required:true,
      default:0
   }
},{timestamps:true});

module.exports = mongoose.model('User',userSchema);

