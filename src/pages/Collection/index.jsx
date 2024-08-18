import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Collapse,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import Layout from 'lib/components/Layout';
import { logAnalyticsEvent } from 'lib/firebase/analytics';

import { base } from 'themes';
import { Logo } from 'shared/icons';
import { FOOTER_PROPS } from 'shared/constants';

import ContactForm from './ContactForm';
import Debug from './Debug';
import CardsExplorer from './CardsExplorer';
import SetCompletion from './SetCompletion';

import { getFullSet } from 'requests';
import { useData } from './hooks';

import { parseSet, parseList, mergeCards } from './utils';

import { DEFAULT_SET_STATS } from './constants';
import { useDebug } from 'hooks';


export default function SetProgressPage() {
  const reader = new FileReader();
  const { setCode } = useParams();
  const debug = useDebug();

  const [set, setSet] = useState({});
  const [cards, setCards] = useState([]);
  const [list, setList] = useState([]);

  const stats = useData(`sets/${setCode}`) || DEFAULT_SET_STATS;
  const selected = cards?.filter((card) => card.selected);
  const total = selected?.reduce(
    (acc, card) => acc + parseFloat(card.prices.usd), 0
  );

  useEffect(() => {
    fetch(`https://api.scryfall.com/sets/${setCode}`)
      .then((response) => response.json())
      .then(parseSet)
      .then(setSet);

    getFullSet(setCode)
      .then(({ data }) => setCards(data));
  }, [setCode]);

  reader.onload = function(e) {
    const text = e.target.result;
    const parsed = parseList(text).slice(1);

    setList(parsed);
  }

  const handleFile = (e) => {
    const files = Array.from(e.target.files);

    reader.readAsText(files[0]);
  }

  const handleSelected = (card) => {
    const newList = cards.map((row) => {
      if (row.collector_number === card.collectorNumber) {

        return { ...row, selected: !row.selected };
      }

      return row;
    });

    setCards(newList);
  }

  const rows = mergeCards({ cards, list });
  const missing = stats?.missing  || [];

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
        <Grid container spacing={4} py={3}>
          <Grid item xs={12} sm={5} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <SetCompletion
                  missing={missing}
                  rows={rows}
                  set={set}
                  stats={stats}
                  total={total}
                />
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Collapse in={selected?.length > 0}>
                    <ContactForm
                      selected={selected}
                      total={total}
                      isGift={false}
                    />
                  </Collapse>

                  { debug && <Debug rows={rows} handleFile={handleFile} />}
                </Stack>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={7} md={8}>
            <CardsExplorer
              rows={rows}
              missing={missing}
              onCardSelected={handleSelected}
            />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
