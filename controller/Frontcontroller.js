var cloudinary = require('cloudinary').v2;
const {findById}= require('../model/user')

cloudinary.config({ 
    cloud_name:'dex2jplfd', 
    api_key: '526239736128397', 
    api_secret: 'vpQyR5T_1T7UQyRtQ02WM2BDM90',
    
  })

const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const CourseModel = require('../model/course');
const UserModel = require('../model/user');
class FrontController{
    static home=(req,res)=>{
        res.send('hello')
    }

    static adminregister=(req,res)=>{
        res.render('register',{message:req.flash('error')})
    }


    
    static admininsert=async(req,res)=>{
        
        
        
    try{
            console.log(req.body)
            const imagefile=req.files.image
            console.log(imagefile)
            const mycloud=await cloudinary.uploader.upload(imagefile.tempFilePath,{
            folder:'studentphoto',
        })

            const{FirstName,LastName,SchoolName,email,password,Mobile}=req.body
            const admin=await UserModel.findOne({email:email})//first email is schea wala h or second const k andar email wala hai
            //console.log(admin)
            
            if(admin){
                req.flash('error','email already exists')
                res.redirect('/register')
            }
            else{
                if(FirstName && email && password && LastName && SchoolName && Mobile){
                    if(password){
                        try{
                            const hashpassword=await bcrypt.hash(password,10)
                            const result=await UserModel({
                                FirstName:FirstName,
                                email:email,
                                password:hashpassword,
                                LastName:LastName,
                                Mobile:Mobile,
                                SchoolName:SchoolName,
                                image:{
                                    public_id:mycloud.public_id,
                                    url:mycloud.secure_url,
                                }

                                })
                                await result.save();
                                req.flash('success','registration successsful please login');
                                res.redirect("/");
                        }
                        catch(err){
                            console.log(err);
                        }
                    }else{
                        req.flash('error','password and confirm password does not match')
                        res.redirect('/register')
                    }
                }else{
                    req.flash('error','All fields are required')
                    res.redirect('/register')
                }
            }
        //     const result=await AdminModel({
        //         name:name,
        //         email:email,
        //         password:password
        //     })
        //     await result.save();
        //     res.redirect("/login")
        }
        catch(err){
            console.log(err)
        }
    };

    static login=(req,res)=>{
    
        res.render('login',{message:req.flash('success'),message1:req.flash('error')});
    }

    static verify_login=async(req,res)=>{
        try{
            console.log(req.body)
            const{email,password}=req.body
            if(email && password){
                const admin=await UserModel.findOne({email:email})
                console.log(admin)
                if(admin != null){
                    const ismatched=await bcrypt.compare(password,admin.password)//phla password jo user enter krega or second waala jo database m pda h 
                    if(ismatched){
                        if(admin.role=="user"){
                            const token = jwt.sign({id: admin._id}, 'muskanshanuu123');
                        //console.log(token)
                        res.cookie('token',token)
                        // res.redirect('/admin/dashboard')
                        //const user=await AdminModel.findOne({id:admin._id})
                        //req.data=user

                         res.redirect('/dashboard')
                        }
                        if(admin.role=="admin"){
                            const token = jwt.sign({id: admin._id}, 'muskanshanuu123');
                        //console.log(token)
                        res.cookie('token',token)
                        // res.redirect('/admin/dashboard')
                        //const user=await AdminModel.findOne({id:admin._id})
                        //req.data=user

                         res.redirect('registers/registerdisplay')
                        }


                    }
                    else{
                        req.flash("error","email or password not matched")
                        res.redirect('/')
                    }
                }else{
                    req.flash("error","you are not registerd")
                    res.redirect('/')
                }
            }
            else{
                req.flash('error','password and confirm password does not match')
                res.redirect('/')
            }
        }
        catch(err){
        console.log(err)
        }
    
    
        }
        static logout=async(req,res)=>{
            try{
                res.clearCookie('token')
                res.redirect('/')
            }
            catch(err){
                console.log(err)
            }
        }

        static userdelete=async(req,res)=>{
            // console.log(req.params.id)  //id get by params
            try{
                 const result=await UserModel.findByIdAndDelete(req.params.id)
                 //console.log(result)
                 //res.render('admin/blog/blogedit',{b:result})
                 res.redirect('/registers/registerdisplay');
    
            }
            catch(err){
             console.log(err);
            }
         }

         static coursedelete=async(req,res)=>{
            // console.log(req.params.id)  //id get by params
            try{
                 const result=await CourseModel.findByIdAndDelete(req.params.id)
                 //console.log(result)
                 //res.render('admin/blog/blogedit',{b:result})
                 res.redirect('/admin/displaydata');
    
            }
            catch(err){
             console.log(err);
            }
         }
         

        // static registerdisplay=async(req,res)=>{
        //     const data=await AdminModel.find()
        //     console.log('homes')
        //     res.render('registers/registerdisplay',{d:data})

        // }
    
        // static dashboardview=async(req,res)=>{
        //     const data=await AdminModel.find()
        //     console.log('homesss')
        //     res.render('dashboardview',{d:data})
        // }

        // static dashboardview=async(req,res)=>{
        //     try{
        //  const{FirstName,LastName,SchoolName,email,Mobile,image}=req.body
        //   console.log(req.body)
        //       res.render('dashboardview',{e:email,f:FirstName,l:LastName,img:image,s:SchoolName,m:Mobile})
        //     }
        //     catch(err){
        //         console.log(err)
        //     }
        // }
        static dashboardview=async(req,res)=>{
            const data=await UserModel.findById(req.params.id)
            console.log('homes')
            res.render('dashboardview',{d:data})
    
        }

        // static studentregister=(req,res)=>{
        //     res.render('userregister')
        // }

        static studentregister=async(req,res)=>{
            const{FirstName,email,Mobile}=req.admin
            res.render('userregister',{n:FirstName,e:email,m:Mobile})
        }
        

        static studentinsert=async(req,res)=>{
            try{

                const{_id}=req.admin
                const{studentName,email,address,Mobile,btech,mba,mca,Course,branch}=req.body
                const student=await CourseModel({
                    studentName:studentName,
                    email:email,
                    address:address,
                    Mobile:Mobile,
                    Course:Course,
                    branch:branch,
                    user_id:_id
                    // btech:btech,
                    // mba:mba,
                    // mca:mca
                    
                })
                await student.save()
                res.redirect('/userdashboard')

            }catch(err){
                console.log(err)
            }
        }
}







module.exports=FrontController
