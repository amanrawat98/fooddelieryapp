import { IconButton, Typography, Box } from '@mui/material';
import { DeleteOutline, Remove, Add } from '@mui/icons-material';

const QuantityControl = ({ quantity, updateQuantity, size = 'medium', sx = {},isLoading=false }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ...sx }}>
      {quantity > 0 && (
        <IconButton onClick={() => updateQuantity(quantity-1)} size={size} disabled={isLoading}>
          {quantity === 1 ? <DeleteOutline /> : <Remove />}
        </IconButton>
      )}
      {quantity > 0 && (
        <Typography
          variant="body2"
          sx={{
            fontWeight: '600',
            color: 'text.primary',
            fontSize: '1rem',
          }}
        >
          {quantity}
        </Typography>
      )}
      <IconButton onClick={() => updateQuantity(quantity+1)} size={size} disabled={isLoading}>
        <Add />
      </IconButton>
    </Box>
  );
};

export default QuantityControl;
