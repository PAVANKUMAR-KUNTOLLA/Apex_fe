import { createTheme } from "@mui/material/styles";
import config from "../config";
import { compStyleOverride } from "./compStyleOverride";

import { themeColors } from "./themeColors";
import { themePalette } from "./themePalette";
import { themeTypography } from "./themeTypography";

const theme = () => {
  let themeOption = {
    colors: themeColors,
    heading: themeColors.grey900,
    paper: themeColors.paper,
    backgroundDefault: config.backgroundColor,
    darkTextPrimary: themeColors.grey800,
    darkTextSecondary: themeColors.grey800,
    textDark: themeColors.grey900,
    menuSelected: themeColors.secondaryDark,
    menuSelectedBack: themeColors.secondaryLight,
    divider: config.borderColor,
    customization: config,
  };

  return createTheme({
    direction: "ltr",
    breakpoints: {
      values: {
        xs: 0,
        sm: 768,
        md: 1024,
        lg: 1280,
        xl: 1400,
      },
    },
    components: compStyleOverride(themeOption),
    palette: themePalette(themeOption),
    typography: themeTypography(themeOption),
    shadows: [
      "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      "rgba(0, 0, 0, 0.2) 0px 3px 9px",
      "rgba(0, 0, 0, 0.2) 0px 3px 9px",
      "rgba(0, 0, 0, 0.2) 0px 3px 9px",
      "rgba(0, 0, 0, 0.2) 0px 3px 9px",
      "rgba(0, 0, 0, 0.2) 0px 3px 9px",
      "rgba(0, 0, 0, 0.2) 0px 3px 9px",
      "rgba(0, 0, 0, 0.2) 0px 3px 9px",
      "rgba(17, 17, 26, 0.09) 0px 4px 16px, rgba(17, 17, 26, 0.09) 0px 8px 32px", //Card
      "rgba(0, 0, 0, 0.2) 0px 3px 9px",
      "rgba(0, 0, 0, 0.2) 0px 3px 9px",
      "rgba(0, 0, 0, 0.2) 0px 3px 9px",
      "rgba(0, 0, 0, 0.2) 0px 3px 9px",
      "rgba(0, 0, 0, 0.2) 0px 3px 9px",
      "rgba(0, 0, 0, 0.2) 0px 3px 9px",
      "rgba(0, 0, 0, 0.2) 0px 3px 9px",
      "rgba(0, 0, 0, 0.2) 0px 3px 9px",
      "rgba(0, 0, 0, 0.2) 0px 3px 9px",
      "rgba(0, 0, 0, 0.2) 0px 3px 9px",
      "rgba(0, 0, 0, 0.2) 0px 3px 9px",
      "rgba(0, 0, 0, 0.2) 0px 3px 9px",
      "rgba(0, 0, 0, 0.2) 0px 3px 9px",
      "rgba(0, 0, 0, 0.2) 0px 3px 9px",
      "rgba(0, 0, 0, 0.2) 0px 3px 9px",
      "rgba(0, 0, 0, 0.2) 0px 3px 9px",
    ],
  });
};

export default theme;
