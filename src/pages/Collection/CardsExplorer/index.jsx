import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

export function CardsExplorer(props) {
  const { rows, missing, onCardSelected } = props;
  const cards = rows?.filter((row) => missing.includes(row.collectorNumber));

  const collection = (
    cards?.map((row) => {
      const ownedStyles = row.selected ? {} : { opacity: 0.5 }

      return (
        <Grid xs={3} key={row.id}>
          <img
            src={row.image}
            style={{ width: '100%', cursor: 'pointer', ...ownedStyles }}
            alt={row.name}
            onClick={() => onCardSelected(row) }
          />
          <Typography variant="body2" color="text.secondary">
            {row.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            #{row.collectorNumber} {row.rarity} (${row.price})
          </Typography>
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
      {!cards?.length ? noCardsMessage : collection}
    </Grid>
  );
}
