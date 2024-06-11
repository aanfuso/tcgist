import {
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

import { components } from "../base/components";

const palette = {}

const theme = createTheme({
  components,
  palette,
});

export default responsiveFontSizes(theme);
