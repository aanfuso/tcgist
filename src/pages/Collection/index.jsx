import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import qs from 'qs';
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
import { db } from 'lib/firebase';
import {
  child,
  get,
  ref,
  set as dbSet,
 } from 'firebase/database';

import { base } from 'themes';
import { Logo } from 'shared/icons';
import { FOOTER_PROPS } from 'shared/constants';

import ContactForm from './ContactForm';
import Debug from './Debug';
import CardsExplorer from './CardsExplorer';
import SetCompletion from './SetCompletion';

import SubscribeDialog from 'components/SubscribeDialog';

import { getFullSet } from './requests';
import { useData } from './hooks';

import { parseSet, parseList, mergeCards } from './utils';

import { DEFAULT_SET_STATS } from './constants';


export default function SetProgressPage() {
  const reader = new FileReader();
  const { search } = useLocation();
  const { setCode: actualSetCode } = useParams();
  const setCode = 'dmu' || actualSetCode;
  const { debug } = qs.parse(search, { ignoreQueryPrefix: true });

  const [set, setSet] = useState({});
  const [cards, setCards] = useState([]);
  const [list, setList] = useState([]);
  const [isGift, setIsGift] = useState(false);
  const [open, setOpen] = useState(false);

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

  const handleSubmit = (email) => {
    const dbRef = ref(db);
    let emails = [];

    get(child(dbRef, 'users/tcgist')).then((snapshot) => {
      if (snapshot.exists()) {
        emails = [...snapshot.val(), email];
        dbSet(ref(db, 'users/tcgist'), emails)
      } else {
        dbSet(ref(db, 'users/tcgist'), [email])
      }
    }).catch((error) => {
      console.error(error);
    });
  };

  const handleOpen = () => {
    logAnalyticsEvent('click', { label: 'Try TCGist' })

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      navbarProps={{
        logo: (<Logo />),
        right: (
          <Button
            variant="contained"
            onClick={handleOpen}
          >
            Try TCGist
          </Button>
        )
      }}
    >
      <Container sx={{ pt: 15 }}>
        <SubscribeDialog
          open={open}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
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
                      isGift={isGift}
                      toggleGift={toggleGift}
                    />
                  </Collapse>

                  { debug &&  <Debug rows={rows} handleFile={handleFile} />}
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
