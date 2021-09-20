const Task = require("../model/task");




const TASK = {};


TASK.createTask = async(req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });
   
    try{
        await task.save();
        res.send(task)
    }catch(e){
        
        res.status(500).send(e);
    }

    
}

TASK.userTasks = async (req, res) => {
    const match = {};
    const sort  = {};

    if(req.query.completed){
        match.completed = req.query.completed ===  'true';
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':');

         sort[parts[0]] = sort[parts[1]] === 'desc' ? -1 : 1;
    }
    
    try{
        
        const task = await req.user.populate({
            path: 'tasks',
            match,
            options:{
                limit : parseInt(req.query.limit),
                skip : parseInt(req.query.skip),
                sort
            }
        });
        
        if(!task){
            return res.status(404).send();
        }
        res.send(task.tasks);
    }catch(e){
        res.status(500).send(e);
        
    }
    
}


TASK.getAllTasks = async (req, res) => {
    const match = {};

    if(req.query.completed){
        match.completed = req.query.completed ===  'true';
    }
    console.log(match);
    try{
        const task = await Task.find({
            match
        });
        
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }catch(e){
        res.status(500).send(e);
        
    }
    
}



TASK.getTaskById = async(req, res) => {
    const _id = req.params.id;
    
    
    try{
        const task = await Task.findOne({_id, owner: req.user._id});
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }catch(e){
        console.log(e);
        res.status(500).send(e);

    }
    
}




TASK.updateTask =  async(req, res)  => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOp = updates.every((update) => allowedUpdates.includes(update));
    if(!isValidOp){
        return res.status(400).send({error: 'Invalid Update'})
    }
    try{

        const task = await Task.find( { _id :req.params.id, owner: req.user._id  });

        updates.forEach( (update) => task[update] = body[update]);

        await task.save();

        // const task = await Task.findByIdAndUpdate( req.params.id, req.body, {new: true, runValidators: true});
        if(!task){
            return res.status(404).send();
        }
        res.send(user);
    }catch(e){
        res.status(400).send(e);
    }


}


TASK.deleteTask =  async( req, res ) => {
    
    try{
        const task = await Task.findByIdAndDelete(  req.params.id);
        if(!task){
            return res.status(400).send();
        } 
        res.send(task);
    } catch(e){
        res.status(500).send(e);
    }
}




module.exports = TASK;