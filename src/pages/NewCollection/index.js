import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Input,
  Stack,
  Typography,
} from '@mui/material';

import Card from 'components/Card';
import Layout from 'lib/components/Layout';

import { base } from 'themes';
import { FOOTER_PROPS, NAVIGATION_ITEMS } from 'shared/constants';

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
      logo={'LOGOOOO'}
      footerProps={FOOTER_PROPS}
      navigation={NAVIGATION_ITEMS}
    >
      <Container sx={{ pt: 15 }}>
        <Typography variant="h4">
          {set.name} Set Completion
        </Typography>
        <Grid container spacing={2}>
          {cards?.map((card) => (
            <Grid item xs={3} key={card.collectorNumber}>
              <Stack spacing={1}>
                <Card {...card} />
                <Input
                  size="sm"
                  placeholder="Quantity"
                  type="number"
                  variant="soft"
                  minValue={0}
                />
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};
