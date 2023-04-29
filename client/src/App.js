import {Route, Routes, Navigate} from  "react-router-dom";
import "./App.scss";
import Home from "./components/Home/home";
import Playground from "./components/playground/playground";
import PrivateRoute from "./components/privateRoute/privateRoute";
import { useEffect } from "react";
import userData from "./utils/userData";

function App() {
  useEffect(()=>{
    const clearsession = ()=>userData.cleanSession();
    window.addEventListener("beforeunload",clearsession);
    return ()=> window.removeEventListener("beforeunload",clearsession);
  },[])

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route 
        path="/playground" 
        element={
          <PrivateRoute>
            <Playground/>
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={<Navigate to="/" replace/>}
      />
    </Routes>
  );
}

export default App;
