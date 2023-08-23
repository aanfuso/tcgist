import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import Navbar from './Navbar'
import Footer from './Footer'

import { base } from 'lib/themes'

const Layout = (props) => (
  <ThemeProvider theme={base}>
    <CssBaseline />

    <Navbar />
    {props.children}
    <Footer />
  </ThemeProvider>
)

export default Layout
