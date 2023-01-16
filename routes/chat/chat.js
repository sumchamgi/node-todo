//Import Modules
const express = require("express");
const router = express.Router();
const app = express();
const io = require("../../app");
const moment = require("moment")

 router.get("/", (req,res)=>{
    res.render("./chat.html")
})

let users = []; //사용자 리스트

io.on("connection", (socket) => {
    
    //닉네임 받기 - 사용자 리스트에 추가 - notice, users 보내기
    socket.on("nickname", (name) => {
        socket.id = name;
        users.push(socket.id);
        
        io.emit("notice", {nickname: socket.id, conn: true});
        io.emit("users", users);
    });
    
    //메시지 받기 - 모든 클라이언트에게 메시지 보내기
    socket.on("chat message", (chat) => {

        io.emit("chat message", chat);
    });
    
    //로그아웃 신호 받기 - 사용자 이름 알아내 사용자 리스트에서 제거 - notice, users 보내기
    socket.on("disconnect", () => {
        let index = users.indexOf(socket.id);
        users.splice(index, 1);
        io.emit("notice", {nickname: socket.id, conn: false});
        io.emit("users", users);
    });
});

module.exports = router;
