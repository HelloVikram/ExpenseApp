const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const forgetpasswordSchema=new Schema({
    isactive:{
        type:Boolean,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true});

module.exports=mongoose.model('ForgetPasswordRequest',forgetpasswordSchema);

