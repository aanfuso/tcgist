import { palette } from '../pallete';

const { blue, grey } = palette;

const MuiInputBase = {
  styleOverrides: {
    root: {
      minWidth: '100%',
      diplay: 'flex',
      disableUnderline: true,
    },
    input: {
      background: '#fff',
      border: `1px solid ${grey[200]}`,
      borderRadius: '8px 8px 0 8px',
      boxShadow: `0px 2px 4px rgba(0,0,0, 0.05)`,
      color: grey[900],
      fontSize: '0.875rem',
      lineHeight: '1.5rem',
      padding: '8px 12px',
      '&:hover': {
        borderColor: blue[200],
        boxShadow: `0 0 0 1px ${blue[200]}`,
      },
      '&:focus': {
        borderColor: blue[400],
        boxShadow: `0 0 0 3px ${blue[200]}`,
      },
    },
  },
};

export default MuiInputBase;
