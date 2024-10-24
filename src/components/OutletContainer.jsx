import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, MenuList, MenuItem, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const OutletContainer = ({ restaurantOutlets = [], outletNumber, setOutletNumber }) => {
  const [expanded, setExpanded] = useState(false);
  const selectedOutlet = restaurantOutlets[outletNumber] || {};
  const { street } = selectedOutlet;

  const handleSelect = (index) => {
    setOutletNumber(index);
    setExpanded(!expanded);
  };


  return (
    <Accordion
    expanded={expanded}
    onChange={() => setExpanded(!expanded)}
    sx={{
      my: 2,
      borderRadius: 2,
      
    }}
  >
    <AccordionSummary
           expandIcon={
            <ArrowDownwardIcon
              sx={{
                color: 'inherit',
                transition: 'color 0.3s', 
              }}
            />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            backgroundColor: 'var(--background)',
            borderRadius: '2px 2px 0 0',
            color: 'var(--primary)',
            // '&:hover': {
            //   backgroundColor: 'var(--primary)',
            //   color: 'white',
            //   '& .MuiAccordionSummary-expandIcon': {
            //     color: 'white', 
            //   },
            // },
            padding: '8px 16px',
            minHeight: '50px',
            '& .MuiAccordionSummary-content': {
              margin: 0,
            },
          }}
  
    >
      <Typography variant="body1" noWrap sx={{ fontWeight: 'bold' }}>
        {street || 'Select Outlet'}
      </Typography>
    </AccordionSummary>
    <AccordionDetails sx={{ padding: 0 }}>
      <MenuList sx={{ padding: 1 }}>
      {restaurantOutlets.map((item, index) => {
  const isActive = outletNumber === index;
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
        padding: '8px 16px',
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
