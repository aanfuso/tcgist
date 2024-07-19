import { cloneElement } from 'react';
import { useScrollTrigger } from '@mui/material';
import { useTheme } from '@mui/material/styles';


function ScrollTransformation(props) {
  const { children } = props;
  const theme = useTheme();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const {
    bgColorAfter,
    bgColorBefore,
    fadeIn,
    fadeOut,
    heightAfter,
    heightBefore,
    paddignTopAfter,
    smPaddingTopBefore,
    xsPaddingTopBefore,
  } = {
    bgColorAfter: theme.palette.background.default,
    bgColorBefore: 'transparent',
    fadeIn: '0.3s ease-in',
    fadeOut: '0.3s ease-out',
    heightAfter: 32,
    heightBefore: 56,
    paddignTopAfter: 0,
    smPaddingTopBefore: 3,
    xsPaddingTopBefore: 1,
  };

  return cloneElement(children, {
    ...children.props,
    logoStyles: {
      height: trigger ? heightAfter : heightBefore,
      style: {
        transition: trigger ? fadeIn : fadeOut,
      },
    },
    appBarStyles: {
      elevation: 0,
      sx: {
        backgroundColor: trigger ? bgColorAfter : bgColorBefore,
        transition: trigger ? fadeIn : fadeOut,
        pt: {
          xs: trigger ? paddignTopAfter : xsPaddingTopBefore,
          sm: trigger ? paddignTopAfter : smPaddingTopBefore,
        },
      },
    },
  });
};

export default ScrollTransformation;
