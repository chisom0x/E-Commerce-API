const User = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { promisify } = require('util');

exports.demo = (req, res) => {
    res.send('HELLO WORLD')
}

const signToken = id =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id)
    //console.log(token)
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
          ),
          httpOnly: true
    }
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions)

    user.password = undefined;
    user.confirmPassword = undefined;


    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

exports.signUp = async (req, res) => {
   const newUser = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
   })
   createSendToken(newUser, 201, res)
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
  
    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new res.json('Please provide email and password!'));
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');
  
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(res.json('Incorrect email or password', 400));
    }
  
    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
  };
  exports.restrictTo = (...roles) => {
       return (req, res, next) => {
        if(!roles.includes(req.user.role)){
          return next(res.json({message: 'You do not have permission to carry out this action'}))
        }
        next();
       }
  }
  exports.protect = async (req, res, next) => {
    let token;
    if(
      req.headers.authorization && 
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
      return next(res.json({message: 'not logged in'}))
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    const currentUser = await User.findById(decoded.id);
    if(!currentUser){
      return next(res.json({message: 'this user does not exist anymore'}))
    }
    req.user = currentUser;
    next();
  }