import {
  Container,
  Grid,
  Typography,
} from '@mui/material';

import TriggerButton from 'shared/components/TriggerButton';

const SECTION_STYLES = {
  height: '100vh',
  textAlign: {
    xs: 'center',
    md: 'left',
  },
};

export default function Hero() {
  return (
    <Container
      component="section"
      id="main"
      sx={SECTION_STYLES}
    >
      <Grid container
        direction="column"
        height="100%"
        justifyContent="center"
      >
        <Grid item>
          <Typography gutterBottom variant="h1">
            TCGist
          </Typography>
          <Typography gutterBottom variant="h2">
            Collect, trade and play
          </Typography>
          <TriggerButton cta="Get Started Now" size="large" />
        </Grid>
      </Grid>
    </Container>
  );
};
