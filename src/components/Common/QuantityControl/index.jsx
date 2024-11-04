import { IconButton, Typography, Box } from '@mui/material';
import { DeleteOutline, Remove, Add } from '@mui/icons-material';

const QuantityControl = ({ quantity, updateQuantity, size = 'medium', sx = {}, isLoading = false, onlyIcon = false }) => {
  const commonSx = onlyIcon ? { padding: "2px" } : {}
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ...sx }}>
      {quantity > 0 && (
        <IconButton onClick={() => updateQuantity(quantity - 1)} size={size} disabled={isLoading} sx={{ ...commonSx }}>
          {quantity === 1 ? <DeleteOutline /> : <Remove />}
        </IconButton>
      )}
      {quantity > 0 && (
        <Typography
          variant="body2"
          sx={{
            fontWeight: '600',
            color: !onlyIcon ? 'text.primary' : "green",
            fontSize: '1rem',
          }}
        >
          {quantity}
        </Typography>
      )}
      <IconButton onClick={() => updateQuantity(quantity + 1)} size={size} disabled={isLoading} sx={{ ...commonSx }}>
        <Add />
      </IconButton>
    </Box>
  );
};

export default QuantityControl;
