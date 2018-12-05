var express = require('express');
var app = express();
var bodyparser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://localhost:27017');
let db;
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use((req, res, next) => {
    if(!db) {
        console.log('Database connection')
        client.connect(function(err){
            db = client.db('MUM_Nearby');
            next();
        });
    } else {
        next();
    }
});

app.post('/save', function(req, res) {
    console.log(req.body);
    if(req.body) {
        console.log('Inserting data');
        db.collection('NearBy').insertOne(req.body);
        res.end('Data Inserted');
    } else {
        res.end('Invalid data');
    }
});

app.post('/find', function(req, res) {
    if(req.body) {
        var cursor = db.collection('NearBy').find({location:{$near:[req.body.currentLong, req.body.currentLat]}},{_id:0})
        .limit(3);
        cursor.toArray((err, docs) => res.json(docs));
    } else {
        res.end('Invalid data');
    }
});

app.listen(1111);