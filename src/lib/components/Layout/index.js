import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import Navbar from './Navbar'

import { base } from 'lib/themes'

const Layout = (props) => (
  <ThemeProvider theme={base}>
    <CssBaseline />

    <Navbar />
    {props.children}
  </ThemeProvider>
)

export default Layout
