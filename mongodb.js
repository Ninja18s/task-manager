//CRUD 


const { MongoClient, ObjectId } = require('mongodb');


const id = new ObjectId();
console.log(id);

const connectionURL = 'mongodb://127.0.0.1:27017';

const dbName = 'taskManager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('unable to connect');
    }
    const db = client.db(dbName);

    const upd = db.collection('users').deleteOne({ name: 'varun' }, {
        
    });
    upd.then((result) => { console.log(result); }).catch((err) => { console.log(err); })
})

