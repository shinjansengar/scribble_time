import { useEffect } from "react";
import "./participants.scss";
import Identicon from "react-identicons";

const Participants = ({socket,activeUsers,setActiveUsers}) => {
  useEffect(()=>{
    socket?.on("active_users",(data)=>{
      console.log("test",data);
      setActiveUsers(data);
    })
  },[socket]);

  return(
    <div>
      <ul className="list-wrapper">
        {
          activeUsers.map(user =>
            <li key={user.hashValue} className="user-list-item">
              <div className="icon-name">
                <Identicon 
                  className="list-icon"
                  string={user.hashValue}
                  size={30}
                  padding={2}
                  bg="lightgreen"
                />
                <p className="list-username">{user.username}</p>
              </div>
              <p className="list-score">{user.score}</p>
            </li>
          )
        }
      </ul>
    </div>
  );
};

export default Participants;
