import {
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

const palette = {}

const typography = {
  fontSize: 16,
}

const theme = createTheme({
  palette,
  typography,
})

export default responsiveFontSizes(theme);
