const express = require("express");


var moment = require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

const app = express();

const router = express.Router();


router.get("/", (req,res)=>{
    console.log("--------todo------");
    req.app.db.collection("todotask").find().toArray((err, result)=>{
        console.log(result)
        res.render("todo",{todotasks: result})
    })
    
})
//작성
router.post("/write" , (req, res)=>{
    req.app.db.collection('counter').findOne({name: "게시글"}, (err,result)=>{
        var total = result.totalPoint

        console.log(req.body.content) 
        req.app.db.collection("todotask").insertOne({_id : total + 1, content : req.body.content},(err, result)=>{
            req.app.db.collection("counter").updateOne({name:"게시글"},{$inc: {totalPoint : 1}},(err,result)=>{
                if(err){return console.log(err)}
                
            })
            res.redirect("/todo");
    })
    })
    
}) 

router.get("/edit/:id", (req,res)=>{
    
    req.app.db.collection("todotask").findOne({_id :parseInt(req.params.id)}, (err, result)=>{
        console.log(result)//에러코드 꼭 작성하기
        res.render("edit.ejs",{todotasks: result})
    })
    
}) 



 /* router.delete("/delete", (req, res)=>{
    
    req.body._id = parseInt(req.body._id);
    req.app.db.collection("todotask").deleteOne(req.body, (err, result)=>{
    })
    res.send("삭제완료")
    
}) 


router.put("/edit", (req,res)=>{
    req.app.db.collection("todotask").updateOne({_id: parseInt(req.body.id)},{$set : {content : req.body.content}},(err, result)=>{
        res.render("/todo")
    })
})  */




module.exports = router;