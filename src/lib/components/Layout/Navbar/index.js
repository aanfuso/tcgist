import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'

import { BRAND } from 'lib/constants'
import { NAVIGATION } from 'lib/constants'
import SocialLinks from 'lib/components/SocialLinks'

import MenuDrawer from './MenuDrawer'

function Navbar() {
  return (
    <AppBar
      color="transparent"
      sx={{backdropFilter: "blur(20px)"}}
    >
      <Container
        disableGutters
        maxWidth="xl"
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            sx={{
              flexGrow: {
                xs: 1,
                md: 0,
              },
              display: 'flex',
            }}
          >
            <Link
              href="/"
              underline="none"
            >
              {BRAND}
            </Link>
          </Typography>

          {/* big screen */}
          <Box sx={{ ml: 3, flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
            <Stack spacing={1} direction="row">
              {NAVIGATION.map(({anchor, text}) => (
                <Button
                  href={anchor}
                  key={anchor}
                >
                  {text}
                </Button>
              ))}
            </Stack>
          </Box>

          <Box
            sx={{ display: { xs: 'none', md: 'flex' }}}>
            <SocialLinks />
          </Box>
          {/* end big screen */}

          {/* small screen */}
          <MenuDrawer />
          {/* end small screen */}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
