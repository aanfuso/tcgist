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
import { Logo } from 'components/icons';
import { FOOTER_PROPS } from 'constants';

import SetCompletion from 'components/SetCompletion';

import ContactForm from './ContactForm';
import CardsExplorer from './CardsExplorer';

import { useData } from './hooks';
import { useSet } from 'hooks';

import { DEFAULT_SET_STATS } from './constants';


export default function SetProgressPage() {
  const { setCode } = useParams();
  const { set, cards, setCards } = useSet(setCode);

  const stats = useData(`sets/${setCode}`) || DEFAULT_SET_STATS;
  const selected = cards?.filter((card) => card.selected);
  const total = selected?.reduce(
    (acc, card) => acc + parseFloat(card.prices.usd), 0
  );

  const handleSelected = (card) => {
    const newList = cards.map((row) => {
      if (row.collectorNumber === card.collectorNumber) {

        return { ...row, selected: !row.selected };
      }

      return row;
    });

    setCards(newList);
  }

  const missing = stats?.missing || [];

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
            <Grid container spacing={2} style={{ position: "sticky", top: 80 }}>
              <Grid item xs={12}>
                <SetCompletion
                  set={set}
                  stats={stats}
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
                </Stack>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={7} md={8}>
            <CardsExplorer
              rows={cards}
              missing={missing}
              onCardSelected={handleSelected}
            />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
