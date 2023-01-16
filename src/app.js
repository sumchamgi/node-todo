//모듈
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const path = require("path");
const methodOverride = require('method-override')

//서버
const app = express(); //4000: todo
const chatApp = express(); //4001: chat
app.use(express.json());
app.use(bodyParser.json());
app.use(methodOverride("_method"));

//채팅 서버 세팅
const http = require("http").createServer(chatApp);
const io = require("socket.io")(http);
module.exports = io;

chatApp.set("view engine", "ejs");
chatApp.engine("html", require("ejs").renderFile);
chatApp.set("views", path.join(__dirname, 'views'));

chatApp.use("/public", express.static(__dirname + '/public'));

//setting -view , static ,body parser

app.use(express.urlencoded({extended: false}))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));
app.engine("html", require("ejs").renderFile);



app.use("/public", express.static(__dirname + '/public'));




//Router Setting
const router = require("./routes/index");
chatApp.use(router);
app.use("/",router)


// Chat Server Open
http.listen(4001, () => {
    console.log("Chat Server listening on port 4001!");
})

//connet to DB
let db;
MongoClient.connect("mongodb+srv://user_06:admin06@cluster0.zgcjhqh.mongodb.net/?retryWrites=true&w=majority",(err,client)=>{
    if(err) return console.log("----error----");
    db = client.db('todoapp')
    app.db = db;

    app.listen("4000", ()=>{
        console.log("listening on 4000")
    })
})


 app.delete("/delete", (req, res)=>{
    req.body._id = parseInt(req.body._id);
    db.collection("todotask").deleteOne(req.body, (err, result)=>{
        console.log(req.body._id)
    })
    res.send("delete")
}) 


app.put("/edit", (req,res)=>{
    db.collection("todotask").updateOne({_id: parseInt(req.body.id)},{$set : {content : req.body.content}},(err, result)=>{
        res.redirect("/todo")
    })
}) 






