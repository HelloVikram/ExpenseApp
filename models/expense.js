const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const expenseSchema=new Schema({
    amount:{
        type:Number,
        required:true,
        default:0
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

module.exports=mongoose.model('Expense',expenseSchema);

