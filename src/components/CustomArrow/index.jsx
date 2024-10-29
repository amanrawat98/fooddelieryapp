import { IconButton } from '@mui/material';
import { ArrowCircleLeft, ArrowCircleRight } from '@mui/icons-material';

export const CustomArrow = ({ onClick, direction }) => {
  const isLeft = direction === 'left';

  return (
    <IconButton
      onClick={onClick}
      sx={{
        backgroundColor:  'secondary.main',
        color: 'primary.light',
        position: 'absolute',
        top: '50%',
        zIndex: 1,
        left: isLeft ? '10px' : 'auto',
        right: !isLeft ? '10px' : 'auto',
      }}
    >
      {isLeft ? (
        <ArrowCircleLeft sx={{ color: 'primary.light' }} />
      ) : (
        <ArrowCircleRight sx={{ color: 'primary.light' }} />
      )}
    </IconButton>
  );
};
