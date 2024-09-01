import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  LinearProgress,
  Typography,
  Tooltip,
} from '@mui/material';
import { Stars } from '@mui/icons-material';

import { STATS }  from './constants';


export default function SetCompletion(props) {
  const { set, stats } = props;

  return (
    <Card>
      <CardMedia
        component="img"
        image={`/sets/${set.code}.webp` || '/defaults/magic-logo.png'}
        onError={(e) => e.target.src = '/defaults/magic-logo.png'}
        alt={set.name}
        sx={{ p: 5 }}
      />
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
                style={{ cursor: 'pointer' }}
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
