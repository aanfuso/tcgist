import {
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles'

const primaryColor = 'hsl(231, 30%, 9%)'

const primary = {
  main: primaryColor,
}

const palette = {
  primary,
}

const typography = {
  fontSize: 16,
}

const theme = createTheme({
  typography,
  palette,
})

export default responsiveFontSizes(theme)
