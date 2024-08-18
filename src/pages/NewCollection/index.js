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
import { logAnalyticsEvent } from 'lib/firebase/analytics';


import { base } from 'themes';
import { Logo } from 'shared/icons';
import { FOOTER_PROPS } from 'shared/constants';

import { parseSet, parseCard } from '../Collection/utils';

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
          {set.name} Set Completion
        </Typography>
        <Grid container spacing={4} py={3} >
          {cards?.map((card) => (
            <Grid item xs={3} key={card.collectorNumber}>
              <Stack spacing={1}>
                <Card {...card} />
                <Input
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
      </Container>
    </Layout>
  );
};
