import ColorPicker from "../colorPicker/colorPicker";
import "./canvasTools.scss";
import { brushSizes } from "../../constants/constants";

const CanvasTools = ({ clearCanvas, canvasOptions, setCanvasOptions }) => {
  return (
    <div className="canvas-tools">
      <div className="canvas-action">
        <button className="action-btn" >Undo</button>
        <button className="action-btn" onClick={clearCanvas}>Clear</button>
      </div>
      <ColorPicker
        canvasOptions={canvasOptions}
        setCanvasOptions={setCanvasOptions}
      />
      <select
        title="Select brush size"
        value={canvasOptions.size}
        onChange={(e) =>
          setCanvasOptions((state) => {
            return { ...state, size: e.target.value };
          })
        }
        className="brush-size-select"
      >
        {brushSizes.map((size) => {
          return <option key={size}>{size}</option>;
        })}
      </select>
    </div>
  );
};

export default CanvasTools;
