const express=require('express')
const router=express.Router()
const FrontController=require('../controller/Frontcontroller')
const AdminController=require('../controller/Admincontroller')
const RegisterController=require('../controller/Registercontroller')

const admin_auth = require('../middleware/auth')


router.get("/",FrontController.login)//path
router.get("/logout",FrontController.logout)//path



router.get("/register",FrontController.adminregister)//path
router.post('/adminregister',FrontController.admininsert)
//router.get("/login",FrontController.login)//path
router.post('/verify_login',FrontController.verify_login)
router.get("/dashboard",admin_auth,AdminController.dashboard)
router.get('/registers/registerdisplay',RegisterController.registerdisplay)
router.get('/dashboardview/:id',FrontController.dashboardview)

//user register
router.get('/userregister',admin_auth,FrontController.studentregister)
router.post('/studentinsert',admin_auth,FrontController.studentinsert)
router.get('/userdashboard',admin_auth,AdminController.userdashboard)
router.get('/registers/registerdelete/:id',admin_auth,FrontController.userdelete)

//admin dashboard
router.get('/admin/displaydata',RegisterController.displaydata)
router.get('/admin/displaydatadelete/:id',admin_auth,FrontController.coursedelete)


module.exports=router




