export const themePalette = (theme) => {
  return {
    common: {
      black: theme.colors.darkPaper,
      white: theme.colors.paper,
    },
    primary: {
      main: theme.colors.primaryMain,
      light: theme.colors.primaryLight,
      dark: theme.colors.primaryDark,
    },
    secondary: {
      main: theme.colors.secondaryMain,
      light: theme.colors.secondaryLight,
      dark: theme.colors.secondaryDark,
    },
    error: {
      main: theme.colors.errorMain,
      light: theme.colors.errorLight,
      dark: theme.colors.errorDark,
    },
    warning: {
      main: theme.colors.warningMain,
      light: theme.colors.warningLight,
      dark: theme.colors.warningDark,
    },
    success: {
      main: theme.colors.successMain,
      light: theme.colors.successLight,
      dark: theme.colors.successDark,
    },
    grey: {
      50: theme.colors.grey50,
      100: theme.colors.grey100,
      500: theme.colors.grey500,
      600: theme.colors.grey600,
      700: theme.colors.grey700,
      800: theme.colors.grey800,
      900: theme.colors.grey900,
    },
    text: {
      primary: theme.darkTextPrimary,
      secondary: theme.darkTextSecondary,
    },
    background: {
      paper: theme.colors.paper,
      default: theme.backgroundDefault,
    },
    action: {
      hover: theme.customization.backgroundColor,
      //selectedOpacity: 0.05,
      focus: theme.colors.secondaryDark,
      //focusOpacity: 1,
      // selected: theme.colors.secondaryDark,
      // selectedOpacity: 1,
    },
  };
};
