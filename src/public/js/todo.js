
        $("input:checkbox").click(function(){
            $(this).prop("checked") 
            ? ($(this).parent().addClass("on") ,$(this).siblings().addClass("on2") )
            : ($(this).parent().removeClass("on") , $(this).siblings().removeClass("on2") )
            
            $(".delete").click(function(e){
                let num = e.target.dataset.id;
                let on1 = $(this);
                $.ajax({
                    method : "DELETE",
                    url : "/delete",
                    data : {_id : num }
                }).done(function(result){
                    
                    on1.parent("li").fadeOut()
                    location.reload()
                }).fail((xhr,textStatus,errorThrown)=>{
                    console.log(xhr,textStatus,errorThrown)
                }) 
            })  
        }) 
        const date = new Date()
        const todoDate = $(".todo_date")

        const listNum = $(".list_num")
        const todoContent = $(".todo_content").length
        $(()=>{
            todoDate.append(`<div class=todo_today>${date.getMonth()+1}월 ${date.getDate()}일</div>`)
            todoDate.append(`<div class="todo_Tasks">${todoContent} Tasks</div>`);
        })

       
