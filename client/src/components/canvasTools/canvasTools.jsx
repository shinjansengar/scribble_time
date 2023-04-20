import ColorPicker from "../colorPicker/colorPicker";

const CanvasTools = () => {
  return (
    <div className="canvas-tools">
      <button>Undo</button>
      <button>Clear</button>
      <ColorPicker/>
    </div>
  );
};

export default CanvasTools;
