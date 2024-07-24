import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';

import { STATS }  from './constants';


export function SetCompletion(props) {
  const { set, stats } = props;

  return (
    <Card>
      <CardMedia
        component="img"
        image="/sets/dmu.jpg"
        alt={set.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {set.name}
        </Typography>
          {
            STATS.map((stat) => {
              if (!stats) return null;

              const { label, symbol, color } = stat;
              const { count, total, value } = stat && stats[label];
              const icon = symbol ?
                symbol : <StarsIcon style={{ color }} />;

              return (
                <Grid container key={label} spacing={2}>
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
                          color="success"
                          variant="determinate"
                          value={value}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })
          }
      </CardContent>
    </Card>
  );
};
