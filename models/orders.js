const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const orderSchema=new Schema({
    paymentid:{
        type:String
    },
    orderid:{
        type:String
    },
    status:{
        type:String
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

module.exports=mongoose.model('Order',orderSchema);

