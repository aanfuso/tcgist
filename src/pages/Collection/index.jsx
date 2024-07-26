import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import qs from 'qs';
import {
  Collapse,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import Layout from 'lib/components/Layout';

import { base } from 'themes';
import { FOOTER_PROPS, NAVIGATION_ITEMS } from 'shared/constants';

import ContactForm from './ContactForm';
import Debug from './Debug';
import CardsExplorer from './CardsExplorer';
import { SetCompletion } from './SetCompletion';

import { getFullSet } from './requests';
import { useData } from './hooks';

import { parseSet, parseList, mergeCards } from './utils';

import { DEFAULT_SET_STATS } from './constants';


export default function SetProgressPage() {
  const reader = new FileReader();
  const { search } = useLocation();
  const { setCode } = useParams();
  const { debug } = qs.parse(search, { ignoreQueryPrefix: true });

  const [set, setSet] = useState({});
  const [cards, setCards] = useState([]);
  const [list, setList] = useState([]);
  const [isGift, setIsGift] = useState(false);
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

  const toggleGift = (e) => {
    const selected = e.target.checked;

    setIsGift(selected);
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
      navigation={NAVIGATION_ITEMS}
    >
      <Container sx={{ pt: 4, mt: 10 }}>
        <Typography variant="h4">
          {set.name} Set Completion
        </Typography>
        <Grid container spacing={4} py={3}>
          <Grid item xs={8}>
            <CardsExplorer
              rows={rows}
              missing={missing}
              onCardSelected={handleSelected}
            />
          </Grid>

          <Grid item xs={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <SetCompletion set={set} stats={stats} />
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Collapse in={selected?.length > 0}>
                    <ContactForm
                      selected={selected}
                      total={total}
                      isGift={isGift}
                      toggleGift={toggleGift}
                    />
                  </Collapse>

                  { debug &&  <Debug rows={rows} handleFile={handleFile} />}
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
