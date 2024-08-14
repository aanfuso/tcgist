import { WhatsApp } from '@mui/icons-material';

import {
  Button,
  FormGroup,
  Typography,
} from '@mui/material';

const TRADE_CONFIG = {
  gift: {
    rowFormat: (card) => `- ${card.name}`,
    closeLine: () => `I'd like to *gift* them to you.`,
  },
  sell: {
    rowFormat: (card) => `- ${card.name} ($${card.prices.usd})`,
    closeLine: (total) => `Are you interested in *buying* them? It's $${total.toFixed(2)}. Thank you!`,
  },
};

export default function ContactForm({
  selected,
  total,
  isGift,
}) {

  const handleMessage = () => {
    const phone = "971505246532";
    const tradeType = isGift ? 'gift' : 'sell';
    const { rowFormat, closeLine } = TRADE_CONFIG[tradeType];
    const list = selected.map(rowFormat).join('\n');
    const message = `Hi, I have some of the cards you are looking for: \n\n${list}\n\n${closeLine(total)}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
  }

  return (
    <FormGroup>
      <Typography variant="subtitle2">
        {selected?.length} cards selected
      </Typography>
      <Typography gutterBottom variant="subtitle2">
        $ {total?.toFixed(2)}
      </Typography>
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
  );
};
