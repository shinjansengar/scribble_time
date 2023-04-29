import  "./home.scss";
import UserInfo from "../userInfo/userInfo";
import ScribbleLogo from "../../assets/scribble.png";

const Home = ()=>{
    return (
        <div className="main-wrapper">
            <div className="logo-wrapper">
                <img 
                    src={ScribbleLogo}
                    alt="scribble-logo"
                    draggable={false}
                />
            </div>
            <UserInfo/>
        </div>
    )
}

export default Home;