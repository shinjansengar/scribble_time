import { useEffect, useState } from "react";
import "./chats.scss";

const Chats = ({ socket }) => {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("receive_chat_message", (data) => {
      if (data.type === "chat" && data.message) {
        setChats((state) => [...state, data.message]);
      }
    });

    return () => socket.off("receive_chat_message");
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (socket && message !== "") {
      socket.emit("send_chat_message", { type: "chat", message: message });
      setMessage("");
      setChats([...chats, message]);
    }
  };

  return (
    <div className="chats-wrapper">
      <div className="previous-chats">
        {chats.map((chat, index) => {
          return <p key={chat + index}>{chat}</p>;
        })}
      </div>
        <form onSubmit={sendMessage}>
            <div className="chat-input-wrapper">
                <input
                    className="chat-input"
                    type="text"
                    placeholder="Write your guess..."
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
