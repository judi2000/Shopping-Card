const express = require("express");
const app = express();
const mongodb = require("mongodb");

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})
app.use(express.static('public'));



const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";

const dbName = "productsDB";

const client = new MongoClient(url, { useNewUrlParser: true });

client.connect(function (err) {
    assert.equal(null, err);
    console.log("connected to the server");

    const db = client.db(dbName);
    insertDocuments(db, function(){
        client.close();

    })

})


const insertDocuments = function (db, callback) {
    const collection = db.collection("products");

    collection.insertMany([
        {   __id: 100,
            name: "Apples",
            price: 15.90
        },
        {
            __id: 101,
            name: "Oranges",
            price: 17.10
        },
        {
            __id: 102,
            name: "Milk",
            price: 6.60
        },
        {
            __id: 103,
            name: "Rice",
            price: 9.60
        }
    ], function (err, result) {
        assert.equal(err, null);
        console.log("3 items are in")
        callback(result)
    });

};


app.listen(3000, function(){
    console.log("Server is running on Port 3000");
});


