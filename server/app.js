const express = require("express");
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

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
})

server.listen(3001,()=>{
    console.log("server is running");
})