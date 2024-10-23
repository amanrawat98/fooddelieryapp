import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from '../../../slices/dialogSlice';


const CommonDialog = () => {
    const dispatch = useDispatch();
    const { open, title, content, actions, className, style, sx } = useSelector((state) => state.dialog);

    const handleClose = () => {
        dispatch(closeDialog());
    };

    return (
        <Dialog open={open} onClose={handleClose} className={className} style={style} sx={sx} fullWidth>
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{title || ""}</Typography>
                <IconButton aria-label="close" onClick={handleClose} >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            {content ? <DialogContent dividers={!!title}>
                {content}
            </DialogContent> : null}
            {actions ? <DialogActions>
                {actions}
            </DialogActions> : null}
        </Dialog>
    );
};

export default CommonDialog;
