const MongoClient = require("mongodb").MongoClient;
const client =new MongoClient("mongodb://localhost:27017")


client.connect(function(err){
    if (err) throw err;

    const db=client.db("mwa");
    const collection = db.collection("restaurant");

    //Q1.Dispalay all document
    collection.find({},function(err,doc){
        console.dir(doc);
     });

   //Q2.
 
   collection.find({},{projection:{_id:1,name:1,district:1,cuisine:1}});

   //Q3.
   collection.find({},{projection:{_id:0,restaurant_id:1,name:1,district:1,cuisine:1}});

   //Q4
   collection.find({},{projection:{_id:0,restaurant_id:1,name:1,district:1,zipcode:1}});


   //Q5
   collection.find({district:"Bronx"});

   //Q6
   collection.find({district:"Bronx"}).limit(5);

    //Q7
   collection.find({district:"Bronx"}).skip(5).limit(5);

   //Q8
   collection.find({"address.coord":{$lt:-95.754168}});

   //Q9
   collection.find(({$and: [{"address.coord":{$lt:-65.754168}},{cuisine:{$ne:"American "}},{"grades.score":{$gt:70}}] }));

   //Q10
   collection.find({name:{$regex :"^Wil"}},{projection:{_id:0,restaurant_id:1,name:1,district:1,cuisine:1}});

   //Q11
   collection.find({name:{$regex :"ces$"}},{projection:{_id:0,restaurant_id:1,name:1,district:1,cuisine:1}});

   //Q12
   collection.find({name:{$regex :"Reg"}},{projection:{_id:0,restaurant_id:1,name:1,district:1,cuisine:1}});

   // 13. Query to find the restaurants which belongs to the district Bronx and prepared either American or Chinese dish
   collection.find({$and:[{district:'Bronx'},{cuisine:{$in:['Chinese', 'American']}}]});

   // 14.
   collection.find({district:{$in:['Staten Island', 'Queens', 'Bronx', 'Brooklyn']}},{_id:0, restaurant_id:1, name:1,district:1, cuisine:1});

   // 15.
    collection.find({district:{$nin:['Staten Island', 'Queens', 'Bronx', 'Brooklyn']}},{_id:0, restaurant_id:1, name:1,district:1, cuisine:1});

    // 16. 
    collection.find({"grades.score":{$lt:10}},{_id:0, restaurant_id:1, name:1,district:1, cuisine:1});

    // 17. 
    collection.find({"address.coord.1":{$gt:42, $lt: 52}},{_id:0, restaurant_id:1, name:1,address:1});

    // 18.
    collection.find().sort({name:1});

   // 19. 
   collection.find().sort({name:-1});

   // 20 
   collection.find().sort({name:1, cuisine:-1, district:-1});

   // 21.
   collection.find({'address.street':{$exists:true}});

  // 22. 
 collection.find({'address.coord':{$type: "double"}});

  // 23.
collection.find({name: {$regex:'^Mad'}},{name:1, district:1, 'address.coord':1});

})