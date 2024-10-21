// MenuCard.js
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, useTheme } from '@mui/material';
import ArrowCircleRight from '@mui/icons-material/ArrowCircleRight';

const MenuCard = ({ item }) => {
  const theme = useTheme();

  return (
    <Card sx={{ ...theme.commonCardStyles, height: '18rem' }}>
      <CardMedia
        component="img"
        image={item?.menuItemImageUrl}
        alt={item?.name}
        sx={{
          height: '50%',
          objectFit: 'cover',
        }}
      />
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="body" sx={{ fontWeight: '600' }}>
          {item?.name}
        </Typography>
        <Box>
    { item?.description? <Typography
        variant="body2"
        color="gray"
        noWrap
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'wrap',
        }}
      >
        {item?.description?.length > 50 ? `${item?.description?.substring(0, 50)}...` : item?.description}
      </Typography>:null}
    </Box>

        {item?.price && (
          <Box
            sx={{
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '.5rem',
              marginTop: '.5rem',
            }}
          >
            <Box>Price:</Box>
            <Box className="price-color" color="var(--primary)">
              ${item?.price}
            </Box>
            <ArrowCircleRight className="arrow-icon" sx={{ color: 'var(--primary)', textAlign: 'right' }} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MenuCard;
