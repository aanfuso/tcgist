import {
  Container,
  Link,
  Typography,
} from '@mui/material';

function Footer() {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <Container
      component="footer"
      disableGutters
      maxWidth={false}
      sx={{ py: 10 }}
    >
        <Typography gutterBottom variant="body2" textAlign="center">
          Made with ❤️ by
        </Typography>
        <Typography textAlign="center">
          <Link href="#main" underline="none">
            Logo
          </Link>
        </Typography>
        <Typography variant="body2" textAlign="center" >
          &copy; {year} &thinsp;
          All rights reserved.
        </Typography>
    </Container>
  );
};

export default Footer;
