import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import Navbar from './Navbar';
import BackToTopButton from './BackToTopButton';
import Footer from './Footer';

const Layout = (props) => (
  <ThemeProvider theme={props.theme}>
    <CssBaseline />

    <Navbar {...props}/>
    {props.children}
    <BackToTopButton />
    <Footer {...props}/>
  </ThemeProvider>
);

export default Layout;
