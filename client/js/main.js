const chatForm=document.getElementById('chat-form')
const mesg=document.getElementById('msg')
const chatMessages=document.querySelector('.chat-messages');
const socket=io("http://localhost:5000/");
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//add message
socket.on("message",msg=>outputMessage(msg));

const {username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
})
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
  });
  

socket.emit("joinRoom",{username,room})

chatForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const msg= e.target.elements.msg.value;  
    socket.emit("chatMessage",msg)
    mesg.value=""
    chatMessages.scrollTop=chatMessages.scrollHeight
})
// output message
function outputMessage(msg){    
const div=document.createElement('div')
div.classList.add('message')
div.innerHTML=`	<p class="meta">${msg.userName}<span>${msg.time}</span></p>
						<p class="text">
							${msg.text}
						</p>`
chatMessages.appendChild(div)
}
function outputRoomName(room) {
    roomName.innerText = room;
  }
  
  // Add users to DOM
  function outputUsers(users) {
    userList.innerHTML = '';
    users.forEach((user) => {
      const li = document.createElement('li');
      li.innerText = user.username;
      userList.appendChild(li);
    });
  }