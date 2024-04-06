const express = require("express")
const app = express()
const bodyParser = require("body-parser")

const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

const dbName = 'taskProject'
const collName = "task_activity"

app.use(bodyParser.json())
app.use("/", express.static(__dirname + "/dist"))

app.post("/save-task", async function(req, res){
    const payload = req.body
    console.log(payload)

    //connect to database
    await client.connect();
    console.log('Connected successfully to server')

    //initiate database
    const db = client.db(dbName);
    const collection = db.collection(collName)

    //post data to databse
    payload["id"] = 5
    const update = {$set: payload}
    const info = await collection.insertOne({id: 5}, update , {upsert: true})
    console.log(info)
    

    res.send(payload)

    client.close()
})

app.get("/get-task", async function (req, res){
    //connect to database
    await client.connect();
    console.log('Connected successfully to server')

    //initiate database
    const db = client.db(dbName);
    const collection = db.collection(collName)

    // get data from database
    const result = await collection.findOne({id: 5})
    console.log(result)

    res.send(result)
})



app.listen(2600, function(){
    console.log("app is running on port 2600")

}) 
    