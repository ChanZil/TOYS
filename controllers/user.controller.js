const Joi = require("joi");
const bcrypt = require("bcryptjs");
const { User } = require("../models/user.model");
const { generateToken } = require("../utils/jwt")


const userJoiSchema = {
    login: Joi.object().keys({
      password: Joi.string(),
      email: Joi.string()
        .email({ tlds: { allow: ["com"] } })
        .error(() => Error("Email is not valid")),
    }),
  
    register: Joi.object().keys({
      password: Joi.string().max(20).required(),
      passwordConfirm: Joi.string().required(),
      email: Joi.string()
        .email({ tlds: { allow: ["com"] } })
        .error(() => Error("Email is not valid"))
        .required(),
      name: Joi.string().required(),
      date_created: Joi.date(),
    }),
  };


  //register - create new user
  exports.register = async (req, res, next) => {
    try {

        //validate register
        const validate = userJoiSchema.register.validate(req.body);
        if (validate.error) {
          throw Error(validate.error);
        }
    
        //if user already exist
        if (await checkIfUserExists(req.body.email))
          throw new Error("email already exist in the system");
    
        //create new user
        const newUser = new User(req.body);
    
        //encrypt password
        newUser.password = await bcrypt.hash(newUser.password, 10);
    
        //sava new user in database
        await newUser.save();
    
        res.status(201).json({
          ststus: "success",
          newUser,
        });
      } catch (err) {
        console.log(err.message);
        res.status(400).json({msg: err.message});
      }
  }


  //login - get user by email & password
  exports.login = async (req, res, next) => {
    try {

        //validate login
        const validate = userJoiSchema.login.validate(req.body);
        if (validate.error) {
          throw Error(validate.error);
        }
    
        //check is user exists
        const user = await checkIfUserExists(req.body.email);
        // if exsits check if password match
        if (!user || ! await bcrypt.compare(req.body.password, user.password)) {
          throw new Error('Password or email not valid');
        }
    
        //if user exist and password correct, create token
        const token = generateToken(user);
        return res.send({ user, token });
    
      } catch (err) {
        console.log(err.message);
        res.status(400).json({msg: err.message});
      }
    }
    
    //check if user's email already exist in the system 
    async function checkIfUserExists(email) {
      const user = await User.findOne({ email });
      return user;
  }