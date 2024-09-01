import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Input,
  Stack,
  Typography,
} from '@mui/material';

import Layout from 'lib/components/Layout';
import { logAnalyticsEvent } from 'lib/firebase/analytics';

import { base } from 'themes';
import { Logo } from 'components/icons';
import { FOOTER_PROPS } from 'constants';

import Card from 'components/Card';
import SetCompletion from 'components/SetCompletion';

import Debug from './Debug';

import { useDebug, useSet } from 'hooks';

import { getStats, mergeCards } from './utils';

export default function NewCollection() {
  const debug = useDebug()
  const { setCode } = useParams();
  const { set, cards, setCards } = useSet(setCode);
  const [list, setList] = useState([]);

  const handleCountChange = (quantity, target, type) => {
    const newList = cards.map((card) => {
      if (card.collectorNumber === target.collectorNumber) {
        return {
          ...card,
          collected: quantity > 0,
          [`${type}Qty`]: quantity,
        };
      }
      return card;
    });

    setCards(newList);
  };

  const allCards = mergeCards({ cards, list });
  const stats = getStats(allCards);

  return (
    <Layout
      theme={base}
      footerProps={FOOTER_PROPS}
      navbarProps={{
        logo: (<Logo />),
        right: (
          <Button
            href="https://szk4u.mjt.lu/wgt/szk4u/xu59/form?c=0799e44b"
            target="_blank"
            variant="contained"
            onClick={() => logAnalyticsEvent('click', { label: 'Try TCGist' })}
          >
            Try TCGist
          </Button>
        )
      }}
    >
      <Container sx={{ pt: 15 }}>
        <Typography variant="h4">
          {set.name}
        </Typography>
        <Grid container spacing={4} py={3}>
          <Grid item xs={12} sm={5} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <SetCompletion
                  set={set}
                  stats={stats}
                />
              </Grid>
              <Grid item xs={12}>
              {debug && <Debug setList={setList} />}
              {debug && <pre>{JSON.stringify(stats, null, 2) }</pre>}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={7} md={8}>
            <Grid container spacing={4} py={3}>
              {allCards?.map((card) => (
                <Grid item xs={3} key={card.collectorNumber}>
                  <Stack spacing={1}>
                    <Card {...card} selected={card.regularQty > 0} />
                    <Input
                      onChange={(e) => handleCountChange(e.target.value, card, 'regular')}
                      size="sm"
                      placeholder="Regular Quantity"
                      type="number"
                      variant="soft"
                      min={0}
                      value={card.regularQty}
                    />
                    <Input
                      onChange={(e) => handleCountChange(e.target.value, card, 'foil')}
                      size="sm"
                      placeholder="Foil Quantity"
                      type="number"
                      variant="soft"
                      min={0}
                      value={card.foilQty}
                    />
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
