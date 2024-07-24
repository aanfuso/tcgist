import Layout from 'lib/components/Layout';

import { base } from 'themes';
import { FOOTER_PROPS } from 'shared/constants';

import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import qs from 'qs';
import {
  Button,
  Checkbox,
  Collapse,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import {
  CloudUpload,
  Favorite,
  WhatsApp,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import { CardsExplorer } from './CardsExplorer';
import { SetCompletion } from './SetCompletion';

import { getFullSet } from './requests';
import { useData } from './hooks';

import { parseSet, parseList, mergeCards, getStats } from './utils';

import { DEFAULT_SET_STATS } from './constants';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function SetProgressPage() {
  const reader = new FileReader();
  const { search } = useLocation();
  const { setCode } = useParams();
  const { debug } = qs.parse(search, { ignoreQueryPrefix: true });

  const [set, setSet] = useState({});
  const [cards, setCards] = useState([]);
  const [list, setList] = useState([]);
  const [isGift, setIsGift] = useState(false);
  let stats = useData(`sets/${setCode}`) || DEFAULT_SET_STATS;
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

  const TRADE_CONFIG = {
    gift: {
      rowFormat: (card) => `- ${card.name}`,
      closeLine: () => `I'd like to *gift* them to you.`,
    },
    sell: {
      rowFormat: (card) => `- ${card.name} ($${card.prices.usd})`,
      closeLine: () => `Are you interested in *buying* them? It's ${total.toFixed(2)}. Thank you!`,
    },
  };


  const handleMessage = () => {
    const phone = "971505246532";
    const tradeType = isGift ? 'gift' : 'sell';
    const { rowFormat, closeLine } = TRADE_CONFIG[tradeType];
    const list = selected.map(rowFormat).join('\n');
    const message = `Hi, I have some of the cards you are looking for: \n\n${list}\n\n${closeLine()}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
  }

  const statsDebug = (<pre>{JSON.stringify(stats, null, 2) }</pre>);
  const importButton = (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUpload />}
      >
      Import
      <VisuallyHiddenInput type="file" onChange={handleFile} />
    </Button>
  );
  const whatsAppButton = (
    <Collapse in={selected?.length > 0}>
      <FormGroup>
        <Typography variant="subtitle2">
          {selected?.length} cards selected
        </Typography>
        <Typography variant="subtitle2">
          $ {total?.toFixed(2)}
        </Typography>
        <FormControlLabel
          label="Make this a gift for the collectionist"
          control={
            <Checkbox
              onChange={toggleGift}
              color="secondary"
              checked={isGift}
              checkedIcon={<Favorite />}
            />
          }
        />
        <Button
          component="label"
          variant="contained"
          tabIndex={-1}
          onClick={handleMessage}
          startIcon={<WhatsApp />}
          color="whatsapp"
        >
          Message Collectionist
        </Button>
      </FormGroup>
    </Collapse>
  );

  const rows = mergeCards({ cards, list });
  const missing = stats?.missing  || [];
  if (debug) stats = getStats(rows);

  return (
    <Layout
      theme={base}
      footerProps={FOOTER_PROPS}
    >
      <Container sx={{ pt: 4 }}>
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
                  {whatsAppButton}

                  {debug && importButton}

                  {debug && statsDebug}
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
