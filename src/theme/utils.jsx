export const buttonStyles = (theme) => ({
    contained: {
      backgroundColor: 'var(--primary)',
      color: 'white',
      padding: theme.spacing(2),
      transition: "background-color 0.3s, transform 0.3s, box-shadow 0.3s",
      '&:hover': {
        backgroundColor: 'var(--secondary)',
        transform: "scale(1.05)", 
      },
    },
    outlined: {
      borderColor: 'var(--primary)',
      color: 'var(--primary)',
      padding: theme.spacing(1.5, 3),
      transition: "border-color 0.3s, transform 0.3s",
      '&:hover': {
        borderColor: 'var(--secondary)',
        transform: "scale(1.05)", 
      },
    },
    text: {
      color: 'var(--primary)',
      padding: theme.spacing(1, 2),
      '&:hover': {
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
      },
    },
  });

export const commonCardStyles = (theme) => ({
    width: '100%',
    height:  '18rem',
    borderRadius: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)',
        color: "var(--primary)" || theme.palette.primary.main,
        transform: 'scale(1.1)',
        '& .price-color, & .arrow-icon': {
            color: 'green',
        },
    },
});
export const inputStyles = {
  // mb: 2,
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: '4px',
    },
    '& input': {
      padding: '10px 14px',
      height: 'auto',
    },
  },
};