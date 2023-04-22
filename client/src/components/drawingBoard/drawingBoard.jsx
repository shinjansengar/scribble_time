import {useEffect, useRef, useState} from "react";
import "./drawingBoard.scss";
import CanvasTools from "../canvasTools/canvasTools";

const DrawingBoard = ({socket}) =>{
    const [isPainting, setIsPainting] = useState(false);
    const canvasRef = useRef(null);

    const [canvasData, setCanvasData] = useState(null);
    const [isDrawer, setDrawer] = useState(true);
    
    useEffect(()=>{
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.height = 400
        canvas.width = 400
        
        const initialImageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        setCanvasData(initialImageData);
    },[socket])

    useEffect(()=>{
      if(canvasData){
        socket.on("receive_message",(data)=>{
            const newImageData = new ImageData(
            new Uint8ClampedArray(canvasData.data),
            canvasData?.width,
            canvasData?.height
            );
            for (let i = 0; i < data.length; i += 2) {
            newImageData.data[data[i]] = data[i + 1];
            }
            
            setCanvasData(newImageData);
            setDrawer(false);
        })
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if(canvasData){
            ctx.putImageData(canvasData,0,0);
        }
      }
      return ()=> socket.off("receive_message");
    },[canvasData,socket])


    const startPosition=(e)=>{
        setIsPainting(true);
        draw(e);
    }
    
    const finishedPosition = () =>{
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        
        const delta = [];
        for (let i = 0; i < imageData.data.length; i++) {
            if (imageData.data[i] !== canvasData.data[i]) {
                delta.push(i, imageData.data[i]);
            }
        }
        
        setIsPainting(false);
        setCanvasData(imageData);
        sendMessage(delta);
    }

    const draw = (e) =>{
      if(!isPainting) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.lineWidth = 2;
      ctx.lineCap = "round";

      ctx.lineTo(e.clientX,e.clientY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(e.clientX,e.clientY);
    }


    const sendMessage = (imageData)=>{
        if(socket){
          socket.emit("send_message",{data: imageData});
        }
    }
    
    return(
        <div className="canvas-wrapper">
            <canvas 
                ref={canvasRef}  
                className={isDrawer ? "canvas" : "canvas disabled"}
                onMouseDown={startPosition}
                onMouseMove={draw}
                onMouseUp={finishedPosition}
            ></canvas>
            <CanvasTools/>
        </div>
    )   
}

export default DrawingBoard;