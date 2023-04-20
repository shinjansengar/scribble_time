import { useEffect, useState } from "react";
import DrawingBoard from "./components/drawingBoard/drawingBoard";
import io from "socket.io-client"

let socket = io.connect('http://192.168.29.223:3001');

function App() {
  const [canvasData, setCanvasData] = useState(null);
  const [isDrawer, setDrawer] = useState(true);

  useEffect(()=>{
    if(canvasData){
      socket.on("receive_message",(data)=>{
        const newImageData = new ImageData(
          new Uint8ClampedArray(canvasData?.data),
          canvasData?.width,
          canvasData?.height
        );
        for (let i = 0; i < data.length; i += 2) {
          newImageData.data[data[i]] = data[i + 1];
        }
        
        setCanvasData(newImageData);
        setDrawer(false);
      })
    }
    // return ()=> socket.off("receive_message");
  },[canvasData])

  return (
    <div className="App">
      <DrawingBoard
        canvasData={canvasData}
        setCanvasData={setCanvasData}
        socket={socket}
        isDrawer={isDrawer}
      />
    </div>
  );
}

export default App;
