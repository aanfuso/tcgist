import {
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

import { components } from "../base/components";
import { palette } from "./color";

const theme = createTheme({
  components,
  palette,
});

export default responsiveFontSizes(theme);
