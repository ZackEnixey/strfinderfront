// colorHelpers.ts

// Get button colors based on the button color type
export const getButtonColors = (btnColor: string | undefined) => {
    const btnColorMap: Record<string, { btnLight: string, btnDark: string }> = {
      "blue": { btnLight: "#ADD8E6", btnDark: "#4169E1" },
      "green": { btnLight: "#53BD8B", btnDark: "#3D9169" },
      "pink": { btnLight: "#FF6E8D", btnDark: "#AA4258" },
      "yellow": { btnLight: "#ECECA1", btnDark: "#FFD700" },
      "default": { btnLight: "#7CFC00", btnDark: "#556B2F" }
    };
  
    const btnColorLocal = btnColor ?? "default";
    return btnColorMap[btnColorLocal] || btnColorMap["default"];
};

export const getBackgroundColors = (bgColor: string | undefined) => {
  const { btnDark } = getButtonColors(bgColor);

  const bgColorMap: Record<string, { bgLight: string, bgDark: string }> = {
    "blue": { bgLight: "#B0E0E6", bgDark: btnDark },
    "green": { bgLight: "#98FB98", bgDark: btnDark },
    "pink": { bgLight: "#FFB6C1", bgDark: btnDark },
    "yellow": { bgLight: "#FFFFE0", bgDark: btnDark },
    "default": { bgLight: "#D3F9D8", bgDark: btnDark }
  };

  const bgColorLocal = bgColor ?? "default";
  return bgColorMap[bgColorLocal] || bgColorMap["default"];
};