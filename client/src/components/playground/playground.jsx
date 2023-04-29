import { useEffect, useState } from "react";
import Chats from "../chats/chats";
import DrawingBoard from "../drawingBoard/drawingBoard";
import Participants from "../participants/participants";
import "./playground.scss";
import connect from "../../services/connect";

const Playground = () => {
  const [socket, setSocket] = useState();
  
  useEffect(() => {
    setSocket(connect());
  }, []);

  return (
    <div className="playground-wrapper">
      <Participants />
      <DrawingBoard socket={socket} />
      <Chats socket={socket} />
    </div>
  );
};

export default Playground;
