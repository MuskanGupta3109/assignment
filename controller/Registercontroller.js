
const UserModel = require('../model/user');
const CourseModel=require('../model/course');

class RegisterController{
    static registerdisplay=async(req,res)=>{
        const data=await UserModel.find()
        console.log('homes')
        res.render('registers/registerdisplay',{d:data})

    }

    static displaydata=async(req,res)=>{
        const data=await CourseModel.find()
        console.log('display')
        res.render('admin/displaydata',{d:data})
    }
}
module.exports=RegisterController