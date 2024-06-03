import { FC } from "react";

interface StrFinderButtonProps {
    textContent?: string;
    btnHeight?: string;
    btnColor?: string;
}

const StrFinderButton: FC<StrFinderButtonProps> = (props) => {
    const { textContent, btnHeight, btnColor } = props;
    const textContentLocal = textContent ?? "Default Text";
    const btnHeightLocal = btnHeight ?? "8vh";
    const btnColorLocal = btnColor ?? "default";

    console.log(btnHeightLocal);

    let btnLight = "";
    let btnDark = "";

    switch (btnColorLocal) {
        case 'blue': {
            btnLight = '#ADD8E6'; // Light pastel blue
            btnDark = '#4169E1'; // Dark pastel blue
            break;
        }
        case 'green': {
            btnLight = '#90EE90'; // Light pastel green
            btnDark = '#2E8B57'; // Dark pastel green
            break;
        }
        case 'red': {
            btnLight = '#FFC0CB'; // Light pastel red
            btnDark = '#DC143C'; // Dark pastel red
            break;
        }
        case 'yellow': {
            btnLight = '#FFFFE0'; // Light pastel yellow
            btnDark = '#FFD700'; // Dark pastel yellow
            break;
        }
        default: {
            btnLight = '#7CFC00'; // Light pastel grassgreen (default color)
            btnDark = '#556B2F'; // Dark pastel grassgreen (default color)
            break;
        }
    }

    return (
        <div className="button_holder full_center">
            <div className="button_wrapper" style={{ height: btnHeightLocal }}>
                <div className="button_shadow" style={{ backgroundColor: btnDark }}></div>
                <div className="str_button" style={{ backgroundColor: btnLight, border: `2px solid ${btnDark}`}}></div>
            </div>
            <p className="str_button_text">{textContentLocal}</p>
        </div>
    )
}

    export default StrFinderButton