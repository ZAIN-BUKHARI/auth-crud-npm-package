const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose')
const cloudinary = require("./utils/cloudinary");
const multer = require("multer");
const path = require("path");

class ZAIN{
    static async registerWithPlaintext(Model,body){
      try{
        let find=body.email
        const existuser = await Model.findOne({email:find});
        if(existuser){
            return "user with same email already exists";
          }
        let user = new Model(body)
        user= await user.save()
        return user
      }
      catch(e){
        return "database error";
      }
    }
    static async  registerWithBcryptjs(Model,body){
      try{
        let find=body.email
        const existuser = await Model.findOne({email:find});
        if(existuser){
            return "user with same email already exists";
          }
          let passs = body.password
          const hashedPassword = await bcrypt.hash(passs, 8);
          body.password=hashedPassword
        let user = new Model(body)
        user= await user.save()
        return user
      }
      catch(e){
        return "database error";
      }
    }
    static async loginWithoutJwt(Model,body){
      try {
          let mailll = body.email
          const user = await Model.findOne({email:mailll} );
          if (!user) {
            return "users with this email does not exist!";
          }
          return user;
        } catch (e) {
          return e.message ;
        }
    }
    static async loginWithJwtandUser(Model,body){
      try {
          let mailll = body.email
          const user = await Model.findOne({email:mailll} );
          if (!user) {
            return "users with this email does not exist!";
          }
          var token = jwt.sign({ id:user._id}, 'auth-crud');
          return {user,token};
        } catch (e) {
          return e.message ;
        }
    }
    static async loginWithJwtonly(Model,body){
      try {
          let mailll = body.email
          const user = await Model.findOne({email:mailll} );
          if (!user) {
            return "users with this email does not exist!";
          }
          var token = jwt.sign({ id:user._id}, 'auth-crud');
          return token;
        } catch (e) {
          return e.message ;
        }
    }
    static async mongodb(url){
        mongoose.connect(url)
        .then(() => console.log('Connected to MongoDB Atlas'))
        .catch((error) => console.error('Error connecting to MongoDB Atlas'));
    }
    static async findbyId(Model,query) {
       let obj = await Model.find({_id:query})
       return obj
    }
    static async findbyEmail(Model,query) {
       let obj = await Model.find({email:query})
       return obj
    }
    static async findbyName(Model,query) {
       let obj = await Model.find({email:query})
       return obj
    }
    static async postData(Model,body){
      try{
        let schema = await new Model(body)
        await schema.save()
        return 'Object cretead in model'
         }catch(e){
        return 'database error'
      }
    }
    static async findByIdAndUpdate(Model,id,body){
      try{
          let Update = await Model.findOneAndUpdate({"_id":id},{body})
           Update.save()
           return Update
      }catch(e){
        return 'Databaase error'
      }
    }
    static async uploadToCloud(path){
      try {
        const result = await cloudinary.uploader.upload(path);
        return result;
      } catch (err) {
        return 'some issue';
      }
    }
    static multer(){
    return multer({
      storage: multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'public');
        },
        filename:(req,file,cb)=>{
            // cb(null,file.fieldname + '_' + Date.now() )
            cb(null,Date.now()+file.originalname)
        },
    }),
      fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);  
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
          cb(new Error("File type is not supported"), false);
          return;
        }
        cb(null, true);
      },
    }).single("image");
    }
    static middlewear(){
    return multer({
      storage: multer.diskStorage({}),
      fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);  
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
          cb(new Error("File type is not supported"), false);
          return;
        }
        cb(null, true);
      },
    }).single("image");
    }

};

module.exports = ZAIN


