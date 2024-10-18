import { IconButton } from '@mui/material';
import { ArrowCircleLeft, ArrowCircleRight } from '@mui/icons-material';

export const CustomArrow = ({ onClick, direction }) => {
  const isLeft = direction === 'left';

  return (
    <IconButton
      onClick={onClick}
      sx={{
        backgroundColor:  'var(--primary)',
        color: 'white',
        '&:hover': {
          backgroundColor:  'var(--primary)',
        },
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1,
        left: isLeft ? '10px' : 'auto',
        right: !isLeft ? '10px' : 'auto',
      }}
    >
      {isLeft ? (
        <ArrowCircleLeft sx={{ color: 'white' }} />
      ) : (
        <ArrowCircleRight sx={{ color: 'white' }} />
      )}
    </IconButton>
  );
};
