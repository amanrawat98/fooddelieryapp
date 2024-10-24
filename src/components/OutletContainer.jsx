import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, MenuList, MenuItem, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedOutlet } from '../slices/outletSlice';
import { Outlet } from '@mui/icons-material';

const OutletContainer = () => {
  const { selectedOutlet, restaurantOutlets } = useSelector((state) => state?.outlet);
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch()
  const outletAddress = restaurantOutlets?.[selectedOutlet] || {};

  const handleSelect = (outletIndex) => {
    dispatch(setSelectedOutlet(outletIndex));
    setExpanded(!expanded);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      sx={{
        mb:1,
        borderRadius: 2,
        width: 'fit-content',
        position: 'relative', // Added relative positioning for the parent
      }}
    >
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          backgroundColor: 'var(--background)',
          borderRadius: '2px 2px 0 0',
         
         color: 'var(--primary)',
          '& .MuiAccordionSummary-content': {
            margin: 0,
          },
        }}
        expandIcon={
          <ArrowDownwardIcon
            sx={{
              color: 'var(--primary)',
              ml: "5px",
              transition: 'color 0.3s',
            }}
          />
        }

      >
        <Typography variant="body1" noWrap>
          <Outlet sx={{ mr: 1 }} /> {outletAddress?.street || 'No Outlets'}
        </Typography>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          padding: 0,
          position: 'absolute', // Makes it not push down other content
          zIndex: 1,
          backgroundColor: 'white', // Ensures it looks proper when expanded
          width: 'auto',
        }}
      >
        <MenuList sx={{ px: 1 ,paddingBlockStart: 0 }}>
          {restaurantOutlets.map((item, index) => {
            const isActive = selectedOutlet === index;
            const backgroundColor = isActive ? 'var(--primary)' : 'white';
            const color = isActive ? 'white' : 'var(--primary)';

            return (
              <MenuItem
                key={index}
                onClick={() => handleSelect(index)}
                sx={{
                  backgroundColor,
                  color,
                  '&:hover': {
                    backgroundColor,
                    color,
                  },
                  borderRadius: 1,
                  transition: '0.2s',
                }}
              >
                <Typography variant="body1" noWrap>
                  {item.street}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </AccordionDetails>
    </Accordion>

  );
};

export default OutletContainer;
