const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please enter your name"]
    },
    email: {
        type: String,
        required: [true,"Please enter your Email ID"],
        unique: true
    },
    password: {
        type: String,
        required: [true,"Please enter password"]
    },
    contact_no:{
        type: Number,
        required: [true,"Please enter Contact Number"]
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    }
    
});

userSchema.pre('save',async function (next){
    if(!this.isModified('password'))
        return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});

const User = mongoose.model('user',userSchema);
module.exports = User;