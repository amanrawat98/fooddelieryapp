import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrderCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        backgroundColor: 'secondary.main',
        padding: 2,
        borderRadius: 2,
        color:'primary.light',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 3,
        },
      }}
      onClick={() => navigate(`/profile/orders/${item.orderId}`)}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <CardMedia
          component="img"
          image={item?.outlet?.imageUrl}
          alt="baba chicken"
          sx={{
            width: 64,
            height: 64,
            objectFit: 'cover',
            borderRadius: 1,
          }}
        />

        <CardContent sx={{ padding: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 'light' }}>
            {item?.orderRef}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 'light' }}>
            {item?.orderDate}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {item?.outlet?.name}
          </Typography>
        </CardContent>
      </Box>

      <Box mt={2}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          {`Status: ${item?.orderStatus}`}
        </Typography>
      </Box>

      <Box mt={1}>
  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
    Total Price:{' '}
    <Typography
      component="span"
      sx={{ color: 'primary.main', fontWeight: 'bold' }}
    >
      ${item?.orderSubTotal}
    </Typography>
  </Typography>
</Box>
    </Card>
  );
};

export default OrderCard;
