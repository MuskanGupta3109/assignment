const mongoose=require('mongoose')
const UserModel = require('./user')

const CourseSchema=new mongoose.Schema({
    studentName:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    Mobile:{
        type:String,
        required:true
    },

    
    Course:{
        type:String,
        required:true
    },

    branch:{
        type:String,
        required:true
    },

    address:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }


    




},{timestamps:true})
const CourseModel=mongoose.model('course',CourseSchema)

module.exports=CourseModel