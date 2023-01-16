const express = require("express");
const app = express();
const router = express.Router();


//Main 
router.get("/", (req, res)=>{
    res.render("main");
});

//Todo Router
const TodoRouter = require("./todo/todo");


//chat
const ChatRouter = require("./chat/chat")

//game
const GameRouter = require("./game/game")

// Refactoring
router.use("/todo" , TodoRouter);
router.use("/chat", ChatRouter);
router.use("/game", GameRouter);

module.exports = router;