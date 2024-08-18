import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Input,
  Stack,
  Typography,
} from '@mui/material';

import Card from 'components/Card';
import Layout from 'lib/components/Layout';
import SetCompletion from 'pages/Collection/SetCompletion';
import { logAnalyticsEvent } from 'lib/firebase/analytics';


import { base } from 'themes';
import { Logo } from 'shared/icons';
import { FOOTER_PROPS } from 'shared/constants';

import { parseSet, parseCard, getStats } from '../Collection/utils';

import { getFullSet } from '../Collection/requests';


export default function NewCollection() {
  const { setCode } = useParams();

  const [set, setSet] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(`https://api.scryfall.com/sets/${setCode}`)
      .then((response) => response.json())
      .then(parseSet)
      .then(setSet);

    getFullSet(setCode)
      .then(({data}) => data.map(parseCard))
      .then(setCards);
  }, [setCode]);

  const handleCountChange = (quantity, card) => {
    const newList = cards.map((c) => {
      if (c.collectorNumber === card.collectorNumber) {
        return {...c, count: quantity};
      }

      return c;
    });

    setCards(newList);
  }

  const stats = getStats(cards);

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
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={7} md={8}>
            <Grid container spacing={4} py={3}>
              {cards?.map((card) => (
                <Grid item xs={3} key={card.collectorNumber}>
                  <Stack spacing={1}>
                    <Card {...card} selected={card.count > 0} />
                    <Input
                      onChange={(e) => handleCountChange(e.target.value, card)}
                      size="sm"
                      placeholder="Quantity"
                      type="number"
                      variant="soft"
                      min={0}
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
