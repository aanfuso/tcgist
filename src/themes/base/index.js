import {
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';

import { components } from './components';
import { palette } from './pallete';
import { typography } from './typography';

const theme = createTheme({
  components,
  palette,
  typography,
});

export default responsiveFontSizes(theme);
