import { useState, useEffect } from "react";
import { Button, Container, Input, Stack, Typography } from "@mui/material";

import Layout from "lib/components/Layout";
import PlatformSelector from "./PlatformSelector";

import {
  convertToCSV,
  parseList,
 } from "./utils";

import { useLocalStorage } from "utils/hooks";
import { MOXFIELD } from "utils/constants";

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

    setItems(data);

    window.location.href = "/";
  }

  const handlePlatformChange = (event, platform) => {
    setParser(platform);
  }

  return (
    <Layout>
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
      </Container>
    </Layout>
  );
};
