const express=require('express')
const {MongoClient} = require('mongodb');
const bodyParser=require('body-parser');
const app=express();
const cors=require('cors')
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended:true
}))
var url = "mongodb://localhost:27017";
MongoClient.connect(url, function(err, client) {
    if (err) throw err;

    var db = client.db("E-Commerce");

    // Check if the database exists
    db.admin().listDatabases((err, dbs) => {
        if (err) throw err;

        const databaseExists = dbs.databases.some(db => db.name === "E-Commerce");
        if (databaseExists) {
            console.log("Database already exists!");

            // Check if the collection exists
            db.listCollections({ name: "users" }).toArray((err, collections) => {
                if (err) throw err;

                if (collections.length > 0) {
                    console.log("Collection already exists!");
                } else {
                    // Create the collection
                    db.createCollection("users", function(err, res) {
                        if (err) throw err;
                        console.log("Collection created!");
                    });
                }
              
            });
        } else {
            console.log("Database does not exist.");
          
        }
    });
});
app.post("/userssearch", async function(req, res) {
    try {
        let Email = req.body.email;
        let Password1 = req.body.password;
        console.log("Input: " + Email);

        const url = 'mongodb://localhost:27017';
        const client = new MongoClient(url);
        const database = 'E-Commerce';

        await client.connect();
        const db = client.db(database);
        
        const query = { Mail: Email, password: Password1};

        const collection = db.collection('users');
        const response = await collection.find(query).toArray();

        if (response.length === 0) {
            // If no data is found, send an appropriate message
            throw new Error("No User Exist");
        }

        console.log(response);
        const path = require('path');
        const filePath = path.resolve(__dirname, 'index.html');
        res.sendFile(filePath);

        //res.send("<h1>Name of the users: " + Email + " "+Password1+"</h1>");
    } catch (error) {
        console.error("Error:", error);
        res.status(404).send("User Email not found.");
    } 
});
app.post("/usersinsert", async function(req, res1) {
    try {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const Email = req.body.email;
        const Password1 = req.body.password;
        console.log("Input: " + firstname + ", " + lastname + ", " + Email+","+Password1);
        const url = 'mongodb://localhost:27017';
        const client = new MongoClient(url);
        const database = 'E-Commerce';
        await client.connect();
        const db = client.db(database);
            
        const document = { Firstname: firstname, Lastname: lastname, Mail: Email, password: Password1 };
    
        const collection = db.collection('users');
        const result = await collection.insertOne(document);
    
        if (result.insertedCount === 0) {
           throw new Error("Failed to insert data.");
        }
    
        console.log("Data inserted successfully");
    
        res1.send("<h1>Data Inserted successfully</h1>");
    } catch (error) {
        console.error("Error:", error);
        res1.status(500).send("Failed to insert data.");
    } 
});
app.listen(8000,function(){
    console.log("Server is running on port number 8000")
})
