import "./colorPicker.scss";
import { colors } from "../../constants/constants";

const ColorPicker = ({ canvasOptions, setCanvasOptions }) => {
  return (
    <div className="color-picker-wrapper">
      {colors.map((color) => {
        return (
          <button
            key={color}
            className="color-btn"
            style={{ background: color }}
            onClick={() =>
              setCanvasOptions((state) => {
                return { ...state, color: color };
              })
            }
          />
        );
      })}
      <input
        type="color"
        className="color-picker-input"
        title="Pick your color"
        value={canvasOptions.color}
        onChange={(e) =>
          setCanvasOptions((state) => {
            return { ...state, color:  e.target.value };
          })
        }
      />
    </div>
  );
};

export default ColorPicker;
