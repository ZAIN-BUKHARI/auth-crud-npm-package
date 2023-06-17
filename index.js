var bcrypt = require('bcryptjs');
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
   
};

module.exports = ZAIN


