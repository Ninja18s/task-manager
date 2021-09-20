const multer = require("multer");
const User = require("../model/user");



const USER= {};


USER.createUser = async(req, res) => {
    const user = new User(req.body)
    
    try{
        await user.save();
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (e){
        res.status(500).send(e);
    }
}

USER.login = async (req, res) => {
    try{
        const { email, password} = req.body;
        const user = await User.findByCredentials(email, password);

        const token = await user.generateAuthToken(); 

        
        res.send({user, token});
    } catch(e){
        res.status(400).send(e);
    }
}

USER.profile =(req, res) => {
    const user = req.user;
    res.send(user)
}

USER.logout = async (req, res) => {
    const Token = req.token;
    const user = req.user;
    try{
        user.tokens = user.tokens.filter( (token) => {
            return token.token !== Token;
        });

        await user.save();

        res.send(user);

    } catch(e){
        res.status(500).send(e);
    }
}

USER.logoutAll = async(req , res) => {
    const user = req.user;

    try{
        user.tokens = [];
        
        await user.save();

        res.send(user);

    }catch(e){
        res.status(500).send();
    }
}



USER.getUsers = async (req,res) => {
    
    try{
        const users = await  User.find({});
        
        if(!users){
            return res.status(400).send();
        }
        res.send(users);
    }catch(e){
         console.log(e);
    }
  
}


USER.getUserById = async(req, res) => {
    const _id = req.params.id;

    try{
        const user = await User.findById(_id);
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    }catch(e){
        res.status(500).send(e);
    }
}

USER.updateUser = async(req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'are'];
    const isValidOp = updates.every((update) => allowedUpdates.includes(update));  

    if(!isValidOp){
        return res.status(400).send({error: 'Invalid Update'})
    }
    try{

        const user = await User.findById(req.params.id);

        updates.forEach( (update) => user[update] = req.body[update]);
        await user.save();

        // const user = await User.findByIdAndUpdate( req.params.id, req.body, {new: true, runValidators: true});
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    }catch(e){
        res.status(400).send(e);
    }
}

USER.deleteUser = async(req, res) => {
    try{
        const user = await User.remove(  req.params.id);
        if(!user){
            return res.status(400).send();
        } 
        res.send(user);
    } catch(e){
        res.status(500).send(e);
    }
}






module.exports = USER;