const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    FirstName:{
        type:String,
        required:true

    },
    LastName:{
        type:String,
        required:true

    },

    SchoolName:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true

    },
    Mobile:{
        type:String,
        required:true

    },
    image:{
        public_id:{
            type:String,
        },
        url:{
            type:String,
        },
    },
    role:{
        type:String,
        default:'user'
    },

},{timestamps:true})
const UserModel=mongoose.model('student',UserSchema)

module.exports=UserModel