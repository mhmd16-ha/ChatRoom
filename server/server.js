import express from "express";
const app = express();
const port = 5000;
import { Server } from "socket.io";
import { message } from "./utils/message.js";
import { getCurrentUser, getRoomUsers, userjoin, userLeave } from "./utils/user.js";

app.get("/", (req, res) => res.send("Hello World!"));
let server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
const io = new Server(server, {
  cors: "*",
});
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    
    const user = userjoin(socket.id, username, room);
    socket.join(user.room);
    socket.emit("message", message(username, "welcom to ChatCord"));
    //Broad cast when user connect
    socket.broadcast.to(user.room).emit(
      "message",
      message(username, `${username} has join the chat`)
    );
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });
 
  //Listen to chat message
  socket.on("chatMessage", (msg) => {
    const user =getCurrentUser(socket.id)
    console.log(user);
    io.to(user.room).emit("message", message(user.username, msg));
  });

  // Send users and room info
  


  //Runs when client disconnect
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        message(user.username, `${user.username} has left the chat`)
      )}
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
})
});  