const express = require('express')
const multer = require('multer')
const methodOverride = require("method-override");
const exphbs = require("express-handlebars");
const path = require("path");
const cors = require("cors");
const {v4: uuidv4} = require('uuid')
uuidv4()
const cookieParser = require("cookie-parser");
const doteenv = require('dotenv')
doteenv.config()

const { dbConnection } = require("../database/connect-db");


class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            index: "/",
            images: "/images"
            // users: "/users/",
        }
 
        this.settings();
        this.routes();
        this.connectDB()

    }
    

    listen(){
        this.app.listen( this.port , () => {
            console.log("PUERTO EN", process.env.PORT)
        })
    }

    settings(){
        this.app.use(cors())

        this.app.set('views', path.join(__dirname, '../views'))

        this.app.engine('.hbs', exphbs.engine({
            defaultLayout: 'main',
            layoutDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            extname: 'hbs'
        }))

        this.app.set('view engine', '.hbs')

        const storage = multer.diskStorage({
            destination:path.join(__dirname, '../public/uploads'),
            filename: (req, file, cb) => {
                cb(null, uuidv4() + path.extname(file.originalname))
            }})
        

        this.app.use(express.json())

        this.app.use(multer({storage}).single('image'))
    
        this.app.use(express.urlencoded({extended: false}));

        this.app.use(methodOverride('_method'))

        this.app.use(express.static(path.join(__dirname, '../public')))

        this.app.use(cookieParser());
  }

  routes(){
    this.app.use(this.paths.index, require('../routes/index'))
    this.app.use(this.paths.images, require('../routes/images'))

    // this.app.use(this.paths.users, require('../routes/users'))
  }

  async connectDB(){
    await dbConnection()
  }
}

module.exports = Server;