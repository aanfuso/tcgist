import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
  Tooltip,
} from '@mui/material';
import { Share, Stars } from '@mui/icons-material';

import { STATS }  from '../constants';


export default function SetCompletion(props) {
  const { set, stats, rows, missing } = props;

  const cards = rows?.filter((row) => missing.includes(row.collectorNumber));
  const handleMessage = () => {
    const list = cards
      .map((card) => `- ${card.name} #${card.collectorNumber} ($${card.price})`)
      .join('\n');
    const message = `I'm looking for these cards from Dominaria United: \n\n${list}\n\nWould you check if you have any of them? \nVisual spoiler: https://tcgist.pages.dev/agu/mtg/dmu`;
    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
  }

  return (
    <Card>
      <CardMedia
        component="img"
        image={`/sets/${set.setCode}.webp`}
        alt={set.name}
        sx={{ p: 5 }}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="share" onClick={handleMessage}>
          <Share />
        </IconButton>
      </CardActions>
      <CardContent>
        {
          STATS.map((stat) => {
            if (!stats) return null;

            const { label, symbol, color } = stat;
            const { count, total, value } = stat && stats[label];
            const icon = symbol ?
              symbol : <Stars style={{ color }} />;

            return (
              <Tooltip
                key={label}
                title={`Collecetd 1x of all ${label} card`}
                placement="left"
              >
                <Grid container spacing={2}>
                  <Grid item>
                    {icon}
                  </Grid>
                  <Grid item xs container>
                    <Grid item xs container direction="column">
                      <Grid item>
                        <Typography variant="body2" color="text.secondary">
                          {count}/{total}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <LinearProgress
                          color="info"
                          variant="determinate"
                          value={value}
                          />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Tooltip>
            );
          })
        }
      </CardContent>
    </Card>
  );
};
