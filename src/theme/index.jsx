
import { createTheme } from '@mui/material/styles';
import { buttonStyles, commonCardStyles } from './utils';


export const createDynamicTheme = (dynamicColors = {}) => {
    const theme = createTheme({
        mode: 'main',
        palette: {
            // primary: {
            //     main: dynamicColors.primaryColor,
            //     light: dynamicColors.primaryColor,
            //     dark: dynamicColors.primaryColor,
            //     contrastText: '#ffffff',
            // },
        },
        components: {
            MuiButton: {
              styleOverrides: {
              
                contained: {
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  padding: '8px 16px',
                  transition: "background-color 0.3s, transform 0.3s, box-shadow 0.3s",
                  '&:hover': {
                    backgroundColor: 'var(--secondary)',
                    transform: "scale(1.05)", 
                  },
                },
                
                outlined: {
                  borderColor: 'var(--primary)', 
                  color: 'var(--primary)', 
                  padding: '8px 16px',
                  transition: "border-color 0.3s, transform 0.3s",
                  '&:hover': {
                    borderColor: 'var(--secondary)', 
                    transform: "scale(1.05)", 
                  },
                },
               
                text: {
                  color: 'var(--primary)', 
                  padding: '8px 16px',
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
                    color: 'var(--primary)',
                    '&.Mui-checked': {
                      color: 'var(--primary)',
                    },
                  },
                }
              },
              
            MuiIconButton: {
                styleOverrides: {
                  root: {
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    transition: 'transform 0.2s ease-in-out',
                    color: 'white', 
                    '&:hover': {
                      transform: 'scale(1.1)',
                      backgroundColor: 'var(--secondary)',
                    },
                  },
                },
              },
          },
        
     
        });


    return {
        ...theme,
        commonCardStyles: commonCardStyles(theme),
    };
};
