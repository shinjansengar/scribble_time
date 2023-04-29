import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./userInfo.scss";
import Identicon from "react-identicons";
import RandomDice from "../../assets/randomize.gif";
import userData from "../../utils/userData";

const UserInfo = () => {
  const [username, setUsername] = useState("");
  const [hashValue, setHashvalue] = useState(`${10000 * Math.random()}`);
  
  const navigate = useNavigate();

  useEffect(()=>{
    userData.cleanSession();
  },[]);

  const handlePlay = () => {
    if (!username) return;
    userData.setData("username",username);
    userData.setData("hashValue", hashValue);
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
          bg="lightgreen"
        />
        <img
          onClick={() => {
            setHashvalue(`${10000 * Math.random()}`);
          }}
          src={RandomDice}
          alt="random"
          className="avatar-random-btn"
          draggable={false}
        />
      </div>
      <button onClick={handlePlay} className="play-btn">
        Play!
      </button>
    </div>
  );
};

export default UserInfo;
