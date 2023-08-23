import { useState, useEffect } from 'react'
import {
  Box,
  CardMedia,
  Typography,
} from '@mui/material'

import { getCard } from './data/cards'

function CardPreview({ item, imageSize = 'normal' }) {
  const [card, setCard] = useState({})

  const {
    artist,
    name,
    imageUris,
    prices,
    setName,
  } = card

  const {
    collectorNumber,
    quantity,
    set,
  } = item

  useEffect(() => {
    if (!set || !collectorNumber) return

    getCard({ set, collectorNumber })
      .then(setCard)
  }, [set, collectorNumber])

  let image = '/mtg-card-back.jpg'
  if (imageSize && imageUris?.front) {
    image = imageUris?.front[imageSize]
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 360,
        p: 2,
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={`${name}. Illustration by ${artist}.`}
        loading="lazy"
      />

      <Typography gutterBottom variant="body1">
        {setName} - {set?.toUpperCase()}
      </Typography>
      <Typography gutterBottom variant="body1">
        Collector #{collectorNumber}
      </Typography>

      <Typography gutterBottom variant="body1">
        USD {prices?.usd}
      </Typography>
      <Typography gutterBottom variant="body1">
        EUR {prices?.eur}
      </Typography>
    </Box>
  )
}

export default CardPreview
