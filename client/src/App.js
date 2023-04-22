import DrawingBoard from "./components/drawingBoard/drawingBoard";
import io from "socket.io-client";

let socket = io.connect("http://192.168.29.223:3001");

function App() {
  return (
    <div className="App">
      <DrawingBoard socket={socket} />
    </div>
  );
}

export default App;
