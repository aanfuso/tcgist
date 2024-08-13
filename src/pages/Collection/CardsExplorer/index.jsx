import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import Card from 'components/Card';

export default function CardsExplorer(props) {
  const { rows, missing, onCardSelected } = props;
  const cards = rows?.filter((row) => missing.includes(row.collectorNumber));

  const collection = (
    cards?.map((row) => {
      const ownedStyles = row.selected ? {} : { opacity: 0.5 }

      return (
        <Grid xs={6} sm={4} md={3} key={row.id}>
          <Card
            {...row}
            onClick={() => onCardSelected(row)}
            sx={ownedStyles}
          />
        </Grid>
     )
    })
  );

  const noCardsMessage = (
    <Grid xs={12} container justifyContent="center" alignItems="center">
      <Grid>
        <Typography variant="h5" color="text.secondary">
          No cards added to the collection yet.
        </Typography>
      </Grid>
    </Grid>
  );

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{ height: '85vh', overflow: 'auto' }}
    >
      {cards?.length ? collection : noCardsMessage}
    </Grid>
  );
}
