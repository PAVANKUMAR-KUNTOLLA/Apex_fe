export const compStyleOverride = (theme) => {
  return {
    MuiPaper: {
      // Component Name
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        //Rule Name
        root: {
          backgroundImage: "none",
        },
        rounded: {
          borderRadius: theme.customization.borderRadius + "px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        sizeMedium: {
          paddingTop: "8px",
          paddingBottom: "9px",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: `#e7ddd1`, //#efe5d8, e7ddd1, ebe3db
          padding: "18px 15px",
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          borderTop: `1px solid ${theme.customization.borderColor}`,
        },
        selectLabel: {
          marginTop: 0,
          marginBottom: 0,
        },
        displayedRows: {
          marginTop: 0,
          marginBottom: 0,
        },
        toolbar: {
          paddingTop: "5px",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          padding: "5px 0",
          boxShadow: "rgb(0 0 0 / 6%) 0px 3px 8px",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          color: theme.colors.textDark,
          padding: "24px",
        },
        title: {
          fontSize: "1.125rem",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "24px",
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: "24px",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: theme.darkTextPrimary,
          paddingTop: "10px",
          paddingBottom: "10px",
          "&.Mui-selected": {
            color: theme.menuSelected,
            backgroundColor: theme.menuSelectedBack,
            "&:hover": {
              backgroundColor: theme.menuSelectedBack,
            },
            "& .MuiListItemIcon-root": {
              color: theme.menuSelected,
            },
          },
          "&:hover": {
            backgroundColor: theme.menuSelectedBack,
            color: theme.menuSelected,
            "& .MuiListItemIcon-root": {
              color: theme.menuSelected,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: theme.darkTextPrimary,
          minWidth: "36px",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: theme.textDark,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: theme.textDark,
          "&::placeholder": {
            color: theme.darkTextSecondary,
            //fontSize: "16px",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: theme.colors.grey50,
          borderRadius: theme.customization.borderRadius + "px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.colors.grey400,
          },
          "&:hover $notchedOutline": {
            borderColor: theme.colors.primaryLight,
          },
          "&.MuiInputBase-multiline": {
            padding: 1,
          },
        },
        input: {
          fontWeight: 500,
          background: theme.colors.grey50,
          padding: "15.5px 14px",
          borderRadius: theme.customization.borderRadius + "px",
          "&.MuiInputBase-inputSizeSmall": {
            padding: "10px 14px",
            "&.MuiInputBase-inputAdornedStart": {
              paddingLeft: 0,
            },
          },
        },
        inputAdornedStart: {
          paddingLeft: 4,
        },
        notchedOutline: {
          borderRadius: theme.customization.borderRadius + "px",
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            color: theme.colors.grey300,
          },
        },
        mark: {
          backgroundColor: theme.paper,
          width: "4px",
        },
        valueLabel: {
          color: theme.colors.primaryLight,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: theme.divider,
          opacity: 1,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: theme.colors.primaryMain,
          background: theme.colors.primary100,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          "&.MuiChip-deletable .MuiChip-deleteIcon": {
            color: "inherit",
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.paper,
          background: theme.colors.grey700,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          minHeight: "25px",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: "16px",
          lineHeight: "22px",
          color: theme.colors.primaryMain,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          position: "relative",
        },
        tag: {
          maxWidth: "100px",
        },
      },
    },
  };
};
