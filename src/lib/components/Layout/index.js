import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import Navbar from './Navbar';
import BackToTopButton from './BackToTopButton';
import Footer from './Footer';

import { base } from 'lib/themes';

const Layout = (props) => (
  <ThemeProvider theme={base}>
    <CssBaseline />

    <Navbar {...props}/>
    {props.children}
    <BackToTopButton />
    <Footer {...props}/>
  </ThemeProvider>
);

export default Layout;
