const socket = io("http://localhost:3000/");
let chatInput=document.getElementById("chatInput");
let messages=document.getElementById("messages");
function sendMesg(){
socket.emit('chatMesg',chatInput.value)
chatInput.value=""
window.scrollTo(0,document.body.scrollHeight)
}

socket.on('reply',(msg)=>{
    var item=document.createElement("li")
    item.textContent=msg
    messages.appendChild(item)
})
chatInput.addEventListener("input",()=>{
    socket.emit('typing') 
})
socket.on('isTyping',()=>{
   document.getElementById("typing").innerHTML="typing...." 
    
}) 
chatInput.addEventListener("keyup",()=>{
    socket.emit('stoptyping') 
})
socket.on('stopTyping',()=>{
    setTimeout(()=>{
        document.getElementById("typing").innerHTML="" 

    },1000)
     
 }) 