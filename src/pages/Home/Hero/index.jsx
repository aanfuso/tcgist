import {
  Box,
  Container,
  Grid,
  Typography,
} from '@mui/material';

import TriggerButton from 'shared/components/TriggerButton';

const SECTION_STYLES = {
  backgroundImage: 'url(/heros/castle.jpg)',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  color: 'white',
  height: '100vh',
  maskImage: 'linear-gradient(to top, transparent 1px, black 20%)',
  textAlign: {
    xs: 'center',
    sm: 'left',
  },
};

export default function Hero() {
  return (
    <Box
      component="section"
      id="main"
      sx={SECTION_STYLES}
    >
      <Container sx={{ height: '100%' }}>
        <Grid container
          height="100%"
          direction="column"
          justifyContent="center"
        >
          <Grid item>
            <Typography
              gutterBottom
              variant="h1"
              sx={{ textShadow: '1px 1px 4px black;' }}
            >
              TCGist
            </Typography>
            <Typography
              gutterBottom
              variant="h2"
              sx={{ textShadow: '1px 1px 4px black;' }}
            >
              Play, trade, collect
            </Typography>
            <TriggerButton cta="Get Started Now" size="large" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
