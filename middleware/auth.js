const jwt=require('jsonwebtoken')
const UserModel= require('../model/user')

const admin_auth=async(req,res,next)=>{
    try{
        //console.log('hello admin')
        const{token }=req.cookies
        //console.log(token)
        const verify_token=jwt.verify(token,'muskanshanuu123')
        console.log(verify_token)
        const admin_data=await UserModel.findOne({_id:verify_token.id})
        //console(admin_data)
        req.admin=admin_data
        
        next()

    }
    catch(error){
        res.redirect('/login')
    }
    

}



module.exports=admin_auth