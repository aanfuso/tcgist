import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Stack,
  Toolbar,
} from '@mui/material';

import ScrollTransformation from './ScrollTransformation';
import MenuDrawer from './MenuDrawer';


function Bar(props) {
  const {
    appBarStyles,
    navigation = [],
    logo,
  } = props;

  return (
    <AppBar {...appBarStyles} >
      <Container disableGutters maxWidth="lg">
        <Toolbar>
          <Box sx={{ flexGrow: 1, pt: 2 }}>
            <Link
              href="/"
              underline="none"
            >
              {logo}
            </Link>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }}}>
            <Stack spacing={1} direction="row">
              {navigation.map(({ anchor, text, options }) => (
                <Button
                  href={anchor}
                  key={anchor}
                  {...options}
                >
                  {text}
                </Button>
              ))}
            </Stack>
          </Box>

          <MenuDrawer navigation={navigation} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const Navbar = (props) => (
  <ScrollTransformation>
    <Bar {...props} />
  </ScrollTransformation>
);

export default Navbar;
