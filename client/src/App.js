import {Route,Routes} from  "react-router-dom";
import "./App.scss";
import Home from "./components/Home/home";
import Playground from "./components/playground/playground";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/playground" element={<Playground/>}/>
    </Routes>
  );
}

export default App;
