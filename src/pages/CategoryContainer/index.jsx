import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoryCard from '../../components/Common/Cards/CategoryCard';
import GoBackButton from '../../components/Common/Buttons/GoBackButton';

export default function CategoryContainer() {
    const menuCategories = useSelector((state) => state?.restaurant?.outletData?.menuCategories);
    
    return (
        <>
        <GoBackButton/>
        <Box sx={{ padding:2 }}>
            <Typography variant="h5" sx={{ marginBottom: 4 }}>
                Menu Categories
            </Typography>
            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }} padding={2}>
                {menuCategories?.map(({ menuCategoryId, menuCategoryImageUrl, name, description, ...rest }) => {
                    if (!menuCategoryId) return null;

                    return (
                        <Link key={menuCategoryId} to={`/category/${menuCategoryId}`} style={{ textDecoration: 'none' }}>
                            <CategoryCard {...{ menuCategoryImageUrl, name, description }} />
                        </Link>
                    );
                })}
            </Box>
        </Box>
        </>
    );
}
