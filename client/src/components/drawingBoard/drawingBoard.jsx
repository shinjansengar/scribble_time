import { useEffect, useRef, useState } from "react";
import "./drawingBoard.scss";
import CanvasTools from "../canvasTools/canvasTools";

const DrawingBoard = ({ socket }) => {
  const [isPainting, setIsPainting] = useState(false);

  const [canvasData, setCanvasData] = useState(null);
  const [isDrawer, setDrawer] = useState(true);

  const [canvasOptions, setCanvasOptions] = useState({
    color: "#000000",
    size: 2,
  });
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.height = 450;
    canvas.width = 600;

    const initialImageData = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
    setCanvasData(initialImageData);
  }, [socket]);

  useEffect(() => {
    if (canvasData) {
      socket?.on("receive_message", (data) => {
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
      });

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (canvasData) {
        ctx.putImageData(canvasData, 0, 0);
      }
    }
    return () => socket?.off("receive_message");
  }, [canvasData, socket]);

  const startPosition = (e) => {
    setIsPainting(true);
    draw(e);
  };

  const finishedPosition = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    
    setIsPainting(false);
  };

  const draw = (e) => {
    if (!isPainting) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let previousImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = canvasOptions.size;
    ctx.lineCap = "round";
    ctx.strokeStyle = canvasOptions.color;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const delta = [];
    for (let i = 0; i < imageData.data.length; i++) {
      if (imageData.data[i] !== previousImageData.data[i]) {
        delta.push(i, imageData.data[i]);
      }
    }
    sendMessage(delta);
  };

  const handleMouseLeave = ()=>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    setIsPainting(false);
  }

  const clearCanvas = ()=>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff"
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillRect(0,0,canvas.width, canvas.height);

  }

  const sendMessage = (delta) => {
    if (socket) {
      socket?.emit("send_message", { data: delta });
    }
  };

  return (
    <div className="canvas-wrapper">
      <canvas
        ref={canvasRef}
        className={isDrawer ? "canvas" : "canvas disabled"}
        onMouseDown={startPosition}
        onMouseMove={draw}
        onMouseUp={finishedPosition}
        onMouseLeave={handleMouseLeave}
      />
      {
        isDrawer && 
        <CanvasTools
          clearCanvas={clearCanvas}
          canvasOptions={canvasOptions}
          setCanvasOptions={setCanvasOptions}
        />
      }
    </div>
  );
};

export default DrawingBoard;
