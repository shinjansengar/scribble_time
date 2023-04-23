import Chats from "../chats/chats";
import DrawingBoard from "../drawingBoard/drawingBoard";
import Participants from "../participants/participants";
import "./playground.scss";

import io from "socket.io-client";

let socket = io.connect("http://192.168.29.223:3001");

const Playground = () => {
  return (
    <div className="playground-wrapper">
      <Participants/>
      <DrawingBoard socket={socket} />
      <Chats socket={socket}/>
    </div>
  );
};

export default Playground;
