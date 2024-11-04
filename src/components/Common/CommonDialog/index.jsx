import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton,  Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from '../../../slices/dialogSlice';


const CommonDialog = () => {
    const dispatch = useDispatch();
    const { open, title, content, actions, className, style, sx, isNoContentPadding } = useSelector((state) => state.dialog);

    const handleClose = () => {
        dispatch(closeDialog());
    };

    return (
        <Dialog open={open} onClose={handleClose} className={className} style={style} sx={sx} 
        PaperProps={{
            sx: {
              width: '80%',
            //   maxWidth: 'none',
            },
          }}
        >
            {title ? <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{title || ""}</Typography>
                <IconButton aria-label="close" onClick={handleClose} sx={{
                    background: "none", color: "text.secondary",
                    "&:hover": { background: "none" }
                }} >
                    <CloseIcon />
                </IconButton>
            </DialogTitle> : null}
            {content ? <DialogContent dividers={!!title} sx={{ padding: isNoContentPadding ? 0 : "1rem" }}>
                {content}
            </DialogContent> : null}
            {actions ? <DialogActions>
                {actions}
            </DialogActions> : null}
        </Dialog>
    );
};

export default CommonDialog;
