import "./userInfo.scss";
import Identicon from "react-identicons";
import RandomDice from "../../assets/randomize.gif";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const [username, setUsername] = useState("");
  const [hashValue, setHashvalue] = useState(`${10000 * Math.random()}`);

  const navigate = useNavigate();

  const handlePlay = () => {
    if (!username) return;
    navigate("./playground")
  };

  return (
    <div className="input-wrapper">
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        className="name-input"
        placeholder="Enter your name"
      />
      <div className="user-avatar">
        <Identicon
          string={hashValue}
          size={100}
          className="avatar"
          padding={2}
          bg="orange"
        />
        <img
          onClick={() => {
            setHashvalue(`${10000 * Math.random()}`);
          }}
          src={RandomDice}
          alt="random"
          className="avatar-random-btn"
        />
      </div>
      <button onClick={handlePlay} className="play-btn">
        Play!
      </button>
    </div>
  );
};

export default UserInfo;
