
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
        color:  theme.palette.primary.main,
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