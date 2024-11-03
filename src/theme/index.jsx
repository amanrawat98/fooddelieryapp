import { createTheme } from '@mui/material/styles';
import { commonCardStyles } from './utils';

export const createDynamicTheme = (dynamicColors = {}) => {
    const backendValue = {
        appBarBackgroundColor: dynamicColors?.appBarBackgroundColor || "#FFFFFF",
        appBarForegroundColor: dynamicColors?.appBarForegroundColor || "#000000",
        backgroundColor: dynamicColors?.backgroundColor || "#FFFFFF",
        primaryColor: dynamicColors?.primaryColor || "#FF8F3A",
        secondaryColor: dynamicColors?.secondaryColor || "#414244",
        headerTextColor: dynamicColors?.headerTextColor || "#000000",
        bodyTextColor: dynamicColors?.bodyTextColor || "#979797",
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: backendValue.primaryColor, // orange
                dark: backendValue.headerTextColor,
                light: backendValue.backgroundColor,
            },
            secondary: {
                main: backendValue.secondaryColor, // gray
            },
            background: {
                default: backendValue.backgroundColor, // primary.light
            },
            text: {
                primary: backendValue.headerTextColor, // black
                secondary: backendValue.bodyTextColor, // gray
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    contained: {
                        backgroundColor: backendValue.primaryColor,
                        color: backendValue.backgroundColor,
                        transition: "background-color 0.3s, transform 0.3s, box-shadow 0.3s",
                        '&:hover': {
                         transform: "scale(1.05)",
                        },
                    },
                    outlined: {
                        transition: "border-color 0.3s, transform 0.3s",
                        '&:hover': {
                            transform: "scale(1.05)",
                        },
                    },
                    text: {
                        color: backendValue.primaryColor,
                        fontWeight:600,
                        '&:hover': {
                            backgroundColor: 'rgba(25, 118, 210, 0.1)',
                        },
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        '& fieldset': {
                            borderRadius: '4px',
                        },
                        '& input': {
                            padding: '10px 14px',
                            height: 'auto',
                        },
                    },
                },
            },
            MuiRadio: {
                styleOverrides: {
                    root: {
                        color: backendValue.primaryColor,
                        '&.Mui-checked': {
                            color: backendValue.primaryColor,
                        },
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        borderRadius: '50%',
                        backgroundColor: backendValue.secondaryColor,
                        transition: "background-color 0.3s, transform 0.3s, box-shadow 0.3s",
                        color: backendValue.backgroundColor,
                        '&:hover': {
                            backgroundColor: backendValue.primaryColor,
                            transform: "scale(1.05)",

                        },
                    },
                },
            },
            MuiTooltip: {
                styleOverrides: {
                  tooltip: {
                    backgroundColor: backendValue.primaryColor,
                    color: backendValue.backgroundColor,
                    fontSize: '0.875rem',
                  },
                  arrow: {
                    color: backendValue.primaryColor,
                  },
                },
            }
        },
    });

    return {
        ...theme,
        commonCardStyles: commonCardStyles(theme),
    };
};
