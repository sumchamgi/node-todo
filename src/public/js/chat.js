$(() => {
    const socket = io();
    
    // 사용자 이름 입력
    var name = prompt("사용하실 닉네임을 입력하세요");
    socket.emit("nickname", name); // 이름 보내기
    socket.on("notice", (notice) => { // 알림 받기
        notice.conn
        ?  ($(".messages").append($("<li class='user_notice'>").html(`<span class="entrance">${notice.nickname}</span>님이 입장하셨습니다. `)),
            $(".chat_box").scrollTop($(".chat_box")[0].scrollHeight))
        :  ($(".messages").append($("<li class='user_notice'>").html(`<span class="exit">${notice.nickname}</span>님이 퇴장하셨습니다. `)),
            $(".chat_box").scrollTop($(".chat_box")[0].scrollHeight));
        
    });
    
    // 사용자 리스트 받기
    socket.on("users", (users) => {
        $(".users").empty();
        for(let i=0; i < users.length; i++){
            $(".users").append($(`<li class= "user_notice">`).text(users[i]));
        }
    });
    
    // 전송 버튼 클릭시
    $("form").submit(() => {
        let msg = $("#msg").val();
        let time = ""
        
        socket.emit("chat message", {name: name, msg: msg}); // 메시지 보내기
        $("#msg").val("");
        
        return false;
    });
    
    socket.on("chat message", (chat) => {
        this.name = name
        const li = document.createElement("li");
        li.classList.add(this.name=== chat.name? "sent": "received")
        const dom = `
        <div class="user">
        <span class="user_name">${chat.name}</span>
        
        <span class="user_message">${chat.msg}</span>
        </div>
        `;
        li.innerHTML=dom
        document.querySelector(".messages").appendChild(li)
     })
     
        
});

