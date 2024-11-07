import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, MenuList, MenuItem, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedOutlet, setSelectedOutletData } from '../slices/outletSlice';
import {  Place, Restaurant } from '@mui/icons-material';
import { handleActiveOutletData } from '../utility/functions';

const OutletContainer = () => {
  const { selectedOutlet, restaurantOutlets, selectedOutletData} = useSelector((state) => state?.outlet);
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch()
  
  const handleSelect = (outletId) => {
    const outletData=handleActiveOutletData(restaurantOutlets,outletId)
    dispatch(setSelectedOutlet(outletId));
    dispatch(setSelectedOutletData(outletData));
    setExpanded(!expanded);
  };
 
  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      sx={{
        mb: 1,
        borderRadius: 2,
        width: 'fit-content',
        position: 'relative', 
      }}
    >
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{

          borderRadius: '2px 2px 0 0',

          color: 'secondary.main',
          '& .MuiAccordionSummary-content': {
            margin: 0,
          },
        }}
        expandIcon={
          <ArrowDownwardIcon
            sx={{
              color: 'secondary.main',
              ml: "5px",
              transition: 'color 0.3s',
            }}
          />
        }

      >
        <Typography variant="body1" noWrap>
          <Restaurant  sx={{ color:"primary.main",mr:2 }}/>
          <Place sx={{ color:"primary.main" }} fontSize='0.9rem'/> {selectedOutletData?.street || 'No Outlets'}
        </Typography>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          padding: 0,
          position: 'absolute', 
          zIndex: 1,
          backgroundColor: 'primary.light', 
          width: 'auto',
        }}
      >
        <MenuList sx={{ px: 1, paddingBlockStart: 0 }}>
          {restaurantOutlets?.map((item, index) => {
            const isActive = selectedOutlet === item?.restaurantOutletId;
            const backgroundColor = isActive ? 'primary.main' : 'primary.light';
            const color = isActive ? 'primary.light' : 'secondary.main';
            return (
              <MenuItem
                key={index+"outlet_menu_container"}
                onClick={() => handleSelect(item?.restaurantOutletId)}
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
