const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const MuiInputBase = {
  styleOverrides: {
    root: {
      minWidth: "100%",
      diplay: "flex",
      disableUnderline: true,
    },
    input: {
      background: "#fff",
      border: `1px solid ${grey[200]}`,
      borderRadius: "8px 8px 0 8px",
      boxShadow: `0px 2px 4px rgba(0,0,0, 0.05)`,
      color: grey[900],
      fontSize: "0.875rem",
      lineHeight: "1.5rem",
      padding: "8px 12px",
      "&:hover": {
        borderColor: blue[200],
        boxShadow: `0 0 0 1px ${blue[200]}`,
      },
      "&:focus": {
        borderColor: blue[400],
        boxShadow: `0 0 0 3px ${blue[200]}`,
      },
    },
  },
};

export default MuiInputBase;
