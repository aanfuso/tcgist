import { useState, useEffect } from "react";
import { Button, Container, Input, Stack, Typography } from "@mui/material";

import Layout from "lib/components/Layout";

import {
  parseLine,
  convertToCSV,
 } from "./utils";

import { useLocalStorage } from "utils/hooks";

const SECTION_STYLES = {
  pt: 10,
  height: "100vh",
};

export function CreateList() {
  const [textList, setTextList] = useState("");
  const [items, setItems] = useLocalStorage("buylist", []);

  useEffect(() => {
    if (items.length) {
      const asText = convertToCSV(items);

      setTextList(asText);
    }
  }, []);

  const handleChange = (event) => {
    const text = event.target.value;

    setTextList(text);
  }

  const handleSave = () => {
    const data = textList.split("\n").map(parseLine);

    setItems(data);

    window.location.href = "/";
  }

  return (
    <Layout>
      <Container sx={SECTION_STYLES}>
        <Typography gutterBottom variant="h5">
          Create a new list
        </Typography>
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
