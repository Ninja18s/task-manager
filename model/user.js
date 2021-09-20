const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');
const Task = require('./task');




const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        uppercase: true

    },
    password: {
        type: String, 
        required: true,
        minlength: 6,
        trim: true,
        validate(value) {
            const pat = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");

            if (value.toLowerCase().includes('password')) {
                throw new Error('password can not be password');
            } else if (!pat.test(value)) {
                throw new Error('regexp  wroking')
            }
        }
    },
    role :{
        type: String,
        
        default: 'user',
       
    },
    // age: {
    //     type: Number,
    //     validate(value){
    //         if(value < 0){
    //             throw new Error('Age must be Positive');
    //         }
    //     }


    // }
    email: {
        type: String,
        required:true,
        lowercase: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('enter valid email')
            }
        }
    },
    tokens: [{
        token: { 
            type:String,
            required: true
        }
    }],
    avatar : {
        type : Buffer
    }

}, {
    timestamps: true
});

userSchema.virtual('tasks', {
    ref:'tasks',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.toJSON = function (){

    const user = this;

    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;


}

userSchema.methods.generateAuthToken = async function () {

    
    const user = this;

    const token = jwt.sign( {
        role: user.role,
        _id: user._id.toString()
    }, process.env.jwt_key);
    user.tokens = user.tokens.concat({token});
    await user.save();

    return token;

}

userSchema.statics.findByCredentials = async function(email, password) {
    
    
    const user = await this.findOne( {email});
    
    if(!user){
        throw new Error ('unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error ('unable to login');
    } 
    
    return user;
}

userSchema.pre('save',async function(next){
    const user = this;


    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,10);
    }
    




    next()
} )

userSchema.pre('remove', async function (next) {
    const user = this ;
    await Task.deleteMany({ owner: user._id });
    next();
})

const User = mongoose.model('user', userSchema);


module.exports = User;