import { useState } from "react";
import { Box, Divider, Grid, List, Typography } from "@mui/material";

import { BuylistItem } from "./BuylistItem";
import { CardPreview } from "./CardPreview";

import Layout from "lib/components/Layout";

import { SAMPLE_BUYLIST } from "./data";

const sectionStyles = { p: 10 };

export function Buylist() {
  const [buyer,] = useState({
    name: "Agustin",
    phone: "971505246532",
  });
  const [items,] = useState(
    SAMPLE_BUYLIST
      .map(obj => ({ ...obj, toOffer: 0 }))
  );
  const [preview, setPreview] = useState({});

  const { name } = buyer;

  const listing = items.map((item, index) => (
    <BuylistItem
      buyer={buyer}
      item={item}
      key={`index-${index}`}
      onMouseEnter={() => setPreview(item)}
    />
  ));

  return (
    <Layout>
      <Box id="whatsapp-buylist" sx={sectionStyles}>
        <Typography gutterBottom variant="h5">
          {name}'s buylist
        </Typography>

        <Typography gutterBottom variant="body1">
          {`This list has ${items.length} individual items`}
        </Typography>

        <Typography gutterBottom variant="body1">
          {`This list has ${items.reduce((n, {quantity}) => n + quantity, 0)} items in total`}
        </Typography>

        <Divider />

        <Grid container>
          <Grid item sm={2} md={3} sx={{ display: { xs: "none", md: "block" } }}>
            <CardPreview item={preview} />
          </Grid>

          <Grid item xs={12} md={9}>
            <Box sx={{ display: "flex", flexFlow: "column wrap" }}>
              <List sx={{ columnCount: { sm: 1, md: 2, lg: 2, xl: 3 } }}>
                {listing}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};
