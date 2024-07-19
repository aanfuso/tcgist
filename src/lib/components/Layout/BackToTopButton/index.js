import {
  Box,
  Fab,
  Fade,
  useScrollTrigger,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
  });

  const handleClick = (event) => {
    const anchor = (
      (event.target).ownerDocument || document
    ).querySelector('#main');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 40, right: 20 }}
      >
        {children}
      </Box>
    </Fade>
  );
};

function BackToTopButton(props) {
  return (
    <ScrollTop {...props}>
      <Fab size="medium" aria-label="Scroll back to top">
        <KeyboardArrowUpIcon />
      </Fab>
    </ScrollTop>
  );
};

export default BackToTopButton;
