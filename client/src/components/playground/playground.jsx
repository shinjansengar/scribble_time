import { useEffect, useState } from "react";
import Chats from "../chats/chats";
import DrawingBoard from "../drawingBoard/drawingBoard";
import Participants from "../participants/participants";
import "./playground.scss";
import connect from "../../services/connect";
import userData from "../../utils/userData";

const Playground = () => {
  const [socket, setSocket] = useState();
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    let socketObj = connect();
    socketObj.emit("join_room", {
      username: userData.getData("username"),
      hashValue: userData.getData("hashValue"),
    });
    
    socketObj.on("active_users",(data)=>{
      setActiveUsers(data);
    })

    setSocket(socketObj);
    return () => {
      socketObj.off("join_room");
      socketObj.off("active_users");
    };
  }, []);

  return (
    <div className="playground-wrapper">
      <Participants
        socket={socket}
        activeUsers={activeUsers}
        setActiveUsers={setActiveUsers}
      />
      <DrawingBoard socket={socket} />
      <Chats socket={socket} />
    </div>
  );
};

export default Playground;
