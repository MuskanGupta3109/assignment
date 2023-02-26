const express=require('express')

const connectDB=require('./db/connect_db')
console.log(express)
const app=express()
const port=4500

const cookieParser=require('cookie-parser')
app.use(cookieParser())


const fileUpload = require("express-fileupload");
const cloudinary = require('cloudinary');
app.use(fileUpload({useTempFiles: true}));

const bodyParser=require('body-parser')

var session = require('express-session')
var flash = require('connect-flash');
const router=require('./routes/web')

// mongo db connection
connectDB()


//route
 
//   app.get('/about', (req, res) => {
//     res.send('About Page')
//   })
//   app.get('/contact', (req, res) => {
//     res.send('contact page')
//   })


//ejs
app.set('view engine','ejs')

//static file path
app.use(express.static('public'))

//body parser
//app.use(bodyParser.urlencoded({extended:false}))
app.use(express.urlencoded({extended:false}))


//messages

app.use(session({
  secret: 'secret',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false,
  
}));

app.use(flash());



//router link connection
app.use('/',router)










// server create
  app.listen(port, () => {
      console.log(`Server is running  localhost : ${port}`)
    })
  