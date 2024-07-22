import { FC } from "react";

import useIsMobile from "../../hooks/useIsMobile";
import { getButtonColors } from "../reusableParts/getButtonColors.ts"

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
  const btnWidthLocal = isMobileVersion ? "90vw" : btnWidth ?? "90vw";
  const btnMarginLocal = btnMargin ?? "10px";
  const { btnLight, btnDark } = getButtonColors(btnColor);
  
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
