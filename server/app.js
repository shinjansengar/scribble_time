const express = require("express");
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("../server/models/user");

app.use(cors());

const server = http.createServer(app);


mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2")
    .then(()=>console.log("DB connected!"));

const io = new Server(server,{
    cors:{
        // origin:["http://localhost:3000","http://192.168.29.223:3000"],
        origin:"*",
        methods:["get","post"]
    }
})

io.on("connection",(socket)=>{
    console.log(`User connected ${socket.id}`);

    socket.on("send_message",(data)=>{
        console.log(data);
        socket.broadcast.emit("receive_message",data.data);
    })

    socket.on("send_chat_message",(data)=>{
        console.log("data",data);
        socket.broadcast.emit("receive_chat_message",data);
    })

    socket.on("join_room", async (data)=>{
        console.log(data);
        let user = new User({
            username: data.username,
            hashValue: data.hashValue,
            socketId: socket.id
        })
        await user.save();

        let activeUsers = await User.find();
        io.emit('active_users',activeUsers);
    })

    socket.on("disconnect", ()=>{
        console.log(`User disconnected with Id ${socket.id}`);
        User.deleteOne({'socketId': socket.id}).then(async ()=>{
            console.log('Data deleted!');
            let activeUsers = await User.find();
            io.emit('active_users',activeUsers);
        }).catch(function(err){
            console.log(err);
        })
    })

})
server.listen(3001,()=>{
    console.log("server is running");
})