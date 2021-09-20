const jwt =  require('jsonwebtoken');

const User = require('../model/user');
const isAUTH = require('../util/authorization');


const  authMiddleware =  async(req, res, next) => {

    const token = req.headers['authorization'];

    
    const id= req.params.id;
  


    if(!token) req.status(504).send('token not found');

    try{
        const decode = jwt.verify(token, process.env.jwt_key);
        
        const role = decode.role;
        if(!isAUTH( role, req.originalUrl.split('?')[0].split('/'+id)[0], req.method)){
            res.status(401).send("access_denied");
        }
        const user = await User.findOne({ _id: decode._id, 'tokens.token' : token})
        
        if(!user){
            throw new Error('please authenticate'); 
        }
        req.user = user;
        req.token = token;
        next();
    } catch(e){
        res.status(505).send(e);
    }
}



module.exports = authMiddleware;