import { FC } from "react";
import useIsMobile from "../../hooks/useIsMobile";

interface StrFinderButtonProps {
  textContent?: any;
  btnHeight?: string;
  btnWidth?: string;
  btnMargin?: string;
  btnColor?: string;
  onClick?: () => void;
}

const StrFinderButton: FC<StrFinderButtonProps> = (props) => {
  const isMobileVersion = useIsMobile();
    
  const { textContent, btnHeight, btnWidth, btnMargin, btnColor, onClick } = props;
  const textContentLocal = textContent ?? "Default Text";
  const btnHeightLocal = btnHeight ?? "8vh";
  const btnWidthLocal = isMobileVersion ? "80vw" : btnWidth ?? "80vw";
  const btnColorLocal = btnColor ?? "default";
  const btnMarginLocal = btnMargin ?? "10px";

  let btnLight = "";
  let btnDark = "";

  switch (btnColorLocal) {
    case "blue": {
      btnLight = "#ADD8E6"; // Light pastel blue
      btnDark = "#4169E1"; // Dark pastel blue
      break;
    }
    case "green": {
      btnLight = "#53BD8B"; // Light pastel green
      btnDark = "#3D9169"; // Dark pastel green
      break;
    }
    case "pink": {
      btnLight = "#FF6E8D"; // Light pastel red
      btnDark = "#AA4258"; // Dark pastel red
      break;
    }
    case "yellow": {
      btnLight = "#FFFFE0"; // Light pastel yellow
      btnDark = "#FFD700"; // Dark pastel yellow
      break;
    }
    default: {
      btnLight = "#7CFC00"; // Light pastel grassgreen (default color)
      btnDark = "#556B2F"; // Dark pastel grassgreen (default color)
      break;
    }
  }

  return (
    <div className="button_holder" onClick={onClick}>
      <div className="button_wrapper max_width_500" style={{ height: btnHeightLocal, width: btnWidthLocal, margin: btnMarginLocal }}>
        <div
          className="button_shadow"
          style={{ backgroundColor: btnDark }}
        ></div>
        <div
          className="str_button"
          style={{
            backgroundColor: btnLight,
            borderBottom: `5px solid ${btnDark}`,
          }}
        ></div>
        <p className="str_button_text">{textContentLocal}</p>
      </div>
    </div>
  );
};

export default StrFinderButton;
