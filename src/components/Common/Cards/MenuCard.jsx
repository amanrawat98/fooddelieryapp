// MenuCard.js
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import ArrowCircleRight from '@mui/icons-material/ArrowCircleRight';

const MenuCard = ({ item }) => {
  return (
    <Card
      sx={{
        width: '100%',
        height: '18rem',
        borderRadius: 6,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.4)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)',
          color: 'var(--primary)',
          transform: 'scale(1.1)',
          '& .price-color,.arrow-icon': {
            color: 'green',
          },
        },
      }}
    >
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
