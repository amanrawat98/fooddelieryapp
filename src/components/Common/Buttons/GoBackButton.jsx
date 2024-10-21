import React from 'react';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {  useNavigate } from 'react-router-dom';

const GoBackButton = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };
    return (
        <Button
            variant="text" 
            onClick={handleGoBack}
            startIcon={<ArrowBackIcon />} 
            sx={{fontWeight:"600"}}
         >
            Go Back
        </Button>
    );
};

export default GoBackButton;
