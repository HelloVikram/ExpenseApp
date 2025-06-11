const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const savedUrl=new Schema({
    url:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true});

module.exports=mongoose.model('SavedUrl',savedUrl);

