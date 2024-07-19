import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import Navbar from './Navbar';
import BackToTopButton from './BackToTopButton';
import Footer from './Footer';

const Layout = (props) => {
  const {
    children,
    theme,
    disableNavbar,
    footerProps,
  } = props;

  const navbarComponent = disableNavbar ? null : <Navbar {...props}/>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {navbarComponent}
      {children}
      <BackToTopButton />
      <Footer {...footerProps}/>
    </ThemeProvider>
  )
};

export default Layout;
