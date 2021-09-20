const mongoose = require('mongoose');
const {Schema} = mongoose;


const taskSchema = new Schema({
    task:{
        type: String,
        required: true,
        lowercase: true,
        minlength: 4,
        trim: true
    },
    description: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 10,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
}, {
    timestamps: true
});

const Task = mongoose.model('tasks', taskSchema);





module.exports =  Task;