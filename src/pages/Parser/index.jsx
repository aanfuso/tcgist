import { useState, useEffect } from "react";
import { Button, Container, Input, Stack, Typography } from "@mui/material";
import { ref, set } from "firebase/database";

import { db } from "lib/firebase";
import { logAnalyticsEvent } from 'lib/firebase/analytics';
import Layout from "lib/components/Layout";

import { base } from 'themes';
import { Logo } from 'components/icons';
import { FOOTER_PROPS } from 'constants';

import PlatformSelector from "./PlatformSelector";

import { convertToCSV, parseList } from "./utils";

import { useLocalStorage } from "hooks";
import { MOXFIELD } from "./constants";

export default function CreateList() {
  const [textList, setTextList] = useState();
  const [items, setItems] = useLocalStorage("buylist", []);
  const [parser, setParser] = useState(MOXFIELD);

  useEffect(() => {
    if (items.length) {
      const asText = convertToCSV(items, parser);

      setTextList(asText);
    }
  }, [parser, items]);

  const handleChange = (event) => {
    const text = event.target.value;

    setTextList(text);
  }

  const handleSave = () => {
    const data = parseList(textList, parser);

    set(ref(db, 'tcgist/buylist'), JSON.stringify(data));
  }

  const handlePlatformChange = (event, platform) => {
    setParser(platform);
  }

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
      <Container sx={{ pt: 10, height: "100vh" }}>
        <Typography gutterBottom variant="h5">
          Create a new list
        </Typography>
        <PlatformSelector
          platform={parser}
          handleChange={handlePlatformChange}
        />

        <Input
          aria-label="List input"
          disableUnderline={true}
          maxRows={20}
          minRows={15}
          multiline
          placeholder="Paste your list here..."
          onChange={handleChange}
          value={textList}
        />

        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <Button
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>
        </Stack>
        <pre>{JSON.stringify(parseList(textList, parser), null, 2) }</pre>
      </Container>
    </Layout>
  );
};
