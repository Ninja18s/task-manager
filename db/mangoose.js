const mongoose = require('mongoose');


 mongoose.connect(process.env.connection_url,{
    useNewUrlParser:true
});

