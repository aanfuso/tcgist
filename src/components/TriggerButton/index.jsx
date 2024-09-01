import { Button, Link } from '@mui/material';


export default function TriggerButton(props) {
  const { cta, size, url } = props;

  return (
    <Button
      color="primary"
      component={Link}
      href={url}
      size={size}
      variant="contained"
      target="_blank"
    >
      {cta}
    </Button>
  )
};
