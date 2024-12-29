import mongoose from "mongoose";

export const dbconn=() =>{
    mongoose.connect('mongodb://localhost:27017/chats').then(()=>{
    console.log("database connection");  
})} 