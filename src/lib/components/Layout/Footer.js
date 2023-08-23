import {
  Container,
  Typography,
} from '@mui/material'

import { BRAND } from 'lib/constants'

function Footer() {
  const today = new Date()
  const year = today.getFullYear()

  return (
    <Container
      component="footer"
      disableGutters
      maxWidth={false}
      sx={{
        borderTop: '1px solid #eaeaea',
        py: 5,
      }}
    >
        <Typography textAlign='center'>
          &copy; {year} <strong>{BRAND}</strong>. All rights reserved.
        </Typography>
    </Container>
  )
}

export default Footer
