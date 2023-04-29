import io from "socket.io-client";

const connect = () => {
    try{
        let socket = io.connect("http://192.168.29.223:3001");
        return socket;
    }
    catch(e){
        console.log(e);
    }
};

export default connect;