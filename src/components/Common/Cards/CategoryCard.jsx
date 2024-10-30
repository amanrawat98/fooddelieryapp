import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { ArrowCircleRight, ArrowForward } from '@mui/icons-material';

const CategoryCard = ({ menuCategoryImageUrl = "", name = "-", description = "" }) => {
    return (
        <Box
            sx={{
                height: 'auto',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Box
                position="relative"
                height="100%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                marginTop={"25%"}

                sx={{
                    borderRadius: '1rem',
                    minWidth: "10rem",
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                    background: 'primary.light',
                    padding: '2rem 1rem',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.4)',
                        color: 'var(--primary)',
                        transform: 'scale(1.05)',
                        ' & .arrow-icon': {
                            color: 'green',
                          },
                    },
                }}
            >

                <Avatar
                    src={menuCategoryImageUrl}
                    alt="menu_image"
                    sx={{
                        width: 100,
                        height: 100,
                        position: 'absolute',
                        top: '-50px',
                        border: '2px solid #ccc',
                        boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.4)',
                        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                    }}
                />


                <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: '600',
                            fontSize: '1rem',
                        }}
                    >
                        {name}
                    </Typography>
                    {/* <Typography variant="body1">
                        {description ||"Explore"} <ArrowCircleRight className='arrow-icon' sx={{color:"red"}}/>
                    </Typography> */}
                </Box>
            </Box>
        </Box>
    );
};

export default CategoryCard;
