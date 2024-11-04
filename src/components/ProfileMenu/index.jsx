import { AccountCircle, Logout } from '@mui/icons-material';
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ProfileMenu({ anchorEl, handleClose, handleLogout }) {
    const navigate = useNavigate()
    const open = Boolean(anchorEl);
    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            sx={{
                "& .MuiPaper-root": {
                  minWidth: "10rem", 
                },
              }}
        >
            <MenuItem onClick={() => {
                navigate("/profile")
                handleClose()
            }}>
              <ListItemIcon>
                    <AccountCircle />
                </ListItemIcon>
               View Profile 
            </MenuItem>

            <Divider />
            <MenuItem onClick={() => {
                handleLogout()
                handleClose()

            }}>
                <ListItemIcon>
                    <Logout  />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    )
}
