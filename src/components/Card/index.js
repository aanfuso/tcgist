import { Box, Typography } from '@mui/material';

export default function Card(props) {
  const {
    collectorNumber,
    image,
    name,
    price,
    rarity,
    selected,
    onClick,
  } = props;

  const ownedStyles = selected ? {} : { opacity: 0.5 };

  return (
    <Box m={1} onClick={onClick}>
      <img
        src={image}
        style={{ width: '100%', cursor: 'pointer', ...ownedStyles }}
        alt={name}
      />
      <Typography variant="body2" color="text.secondary">
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        #{collectorNumber} {rarity} (${price})
      </Typography>
    </Box>
  );
}