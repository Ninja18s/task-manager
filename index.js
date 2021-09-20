const express = require('express');

require('./db/mangoose');

const multer = require('multer');

const userRouter = require('./routes/user');

const taskRouter = require('./routes/task');
const upload = require('./controller/fileUpload');

const authMiddleware = require('./middleware/auth');
const uploadFile = require('./controller/fileUpload');



const port = process.env.PORT || 3000;


const app = express();
app.use(express.json());



app.post('/upload' ,authMiddleware, multer().single('upload') , uploadFile);




app.use('/users', userRouter);

app.use('/task', taskRouter);


app.listen(port, () => console.log(`app is running at ${port}`));


// // const Task = require('./model/task');
// const User = require('./model/user');


// const main = async() => {

//     // const task = await Task.findById('6145b5477506a9744a169c47');

//      const user = await User.findById('6145b5307506a9744a169c3f');
//     // console.log(user);
//     await user.populate('tasks');
//     console.log(user.tasks);
//    // (await task.populate('owner'))
//    // console.log(task.owner);
    
// }
// main()


