const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose')

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
};

module.exports = ZAIN


