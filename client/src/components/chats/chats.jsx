import { useEffect, useState } from "react";
import "./chats.scss";
import userData from "../../utils/userData";
import Identicon from "react-identicons";

const Chats = ({ socket }) => {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket?.on("receive_chat_message", (data) => {
      if (data.type === "chat" && data.message) {
        setChats((state) => [...state, data]);
      }
    });

    return () => socket?.off("receive_chat_message");
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (socket && message !== "") {
      socket.emit("send_chat_message", {
        type: "chat",
        message: message,
        username: userData.getData("username"),
        hashValue: userData.getData("hashValue"),
      });
      setChats([
        ...chats,
        {
          type: "chat",
          message: message,
          username: userData.getData("username"),
          hashValue: userData.getData("hashValue"),
        },
      ]);
      setMessage("");
    }
  };

  return (
    <div className="chats-wrapper">
      <ul className="previous-chats">
        {chats.map((chat, index) => {
          return (
            <li
              key={chat.message}
              className="list-item"
              style={{
                background:
                  chat.username === userData.getData("username") ?
                  "lightgrey" : "yellow",
              }}
            >
              <div className="list-name-icon">
                <Identicon
                  className="list-icon"
                  string={chat.hashValue}
                  size={30}
                  padding={2}
                  bg="lightgreen"
                />
                <p className="list-name">{chat.username}:</p>
              </div>

              <p className="list-message">{chat.message}</p>
            </li>
          );
        })}
      </ul>
      <form onSubmit={sendMessage}>
        <div className="chat-input-wrapper">
          <input
            className="chat-input"
            type="text"
            placeholder="Type your guess..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="chat-btn">
            Enter
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chats;
