const CourseModel = require("../model/course");
const UserModel = require("../model/user");

class AdminController{
    static dashboard=async(req,res)=>{
    //     try{
    //  const{FirstName,LastName,SchoolName,email,Mobile,image}=req.admin
    //   console.log(req.body)
    //       res.render('dashboard',{e:email,f:FirstName,l:LastName,img:image,s:SchoolName,m:Mobile})
          
    //     }
    //     catch(err){
    //         console.log(err)
    //     }

        const data=req.admin
        const {_id}=req.admin
        const btech=await CourseModel.findOne({user_id:_id,Course:"BTECH"})
        const mba=await CourseModel.findOne({user_id:_id,Course:"MBA"})
        const mca=await CourseModel.findOne({user_id:_id,Course:"MCA"})

        res.render('dashboard',{d:data,bt:btech,mba:mba,mca:mca})

    }

    static userdashboard=async(req,res)=>{
        const{_id}=req.admin
        const user=await CourseModel.find({user_id: _id})
        console.log('muskan')
        res.render('userdashboard',{b:user})
    }


}
module.exports=AdminController;