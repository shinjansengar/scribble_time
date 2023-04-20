import {useEffect, useRef, useState} from "react";
import "./drawingBoard.scss";
import CanvasTools from "../canvasTools/canvasTools";

const DrawingBoard = ({
    canvasData,
    setCanvasData,
    socket,
    isDrawer
}) =>{
    const [isPainting, setIsPainting] = useState(false);
    

    const canvasRef = useRef(null);

    useEffect(()=>{
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.height = 400
        canvas.width = 400
        
        const initialImageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        setCanvasData(initialImageData);
    },[])

    useEffect(()=>{
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if(canvasData){
            ctx.putImageData(canvasData,0,0);
        }
    },[canvasData]);

    const startPosition=(e)=>{
        setIsPainting(true);
        draw(e);
    }
    
    const finishedPosition = () =>{
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        setIsPainting(false);
        ctx.beginPath();
        let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        
        const delta = [];
        for (let i = 0; i < imageData.data.length; i++) {
            if (imageData.data[i] !== canvasData.data[i]) {
                delta.push(i, imageData.data[i]);
            }
        }
        
        sendMessage(delta);
    }

    const draw = (e) =>{
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if(!isPainting) return;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";

        ctx.lineTo(e.clientX,e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX,e.clientY);
    }


    const sendMessage = (imageData,x)=>{
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