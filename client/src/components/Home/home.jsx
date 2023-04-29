import  "./home.scss";
import UserInfo from "../userInfo/userInfo";
import { useState } from "react";

const Home = ()=>{
    return (
        <div className="main-wrapper">
            <div>
                <h1>
                    Scribble Time!!!
                </h1>
            </div>
            <UserInfo/>
        </div>
    )
}

export default Home;