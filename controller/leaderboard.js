const user=require('../models/user');
const leaderboard=async(req,res)=>{
    try{
       const aggregate= await user.find()
       .select('username totalexpenses')
       .sort({totalexpenses:-1})
       res.status(200).json(aggregate);
    }catch(err){
       console.log("Error in fatchig leaderboard",err);
    }
    }
    module.exports={leaderboard}