const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'please input your first name']
    },
    lastname: {
        type: String,
        required: [true, 'please input your last name']
    },
    email: {
        type: String,
        required: [true, 'please input your email address']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
      },
    password: {
        type: String,
        required: [true, 'please input your password']
    },
    confirmPassword: {
        type: String,
        required: [true, 'please input your password']
    },

});


userSchema.pre('save', async function(next) {
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
  
    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
  });

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };


const User = mongoose.model('User', userSchema)
module.exports = User