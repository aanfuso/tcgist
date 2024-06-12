import { useState, useEffect } from 'react';
import { Button, Container, Input, Stack, Typography } from '@mui/material';

import Layout from 'lib/components/Layout';

import {
  parseLine,
  convertToCSV,
 } from './utils';

import {
  loadFromLocalStorage,
} from 'utils';

const SECTION_STYLES = {
  pt: 10,
  height: "100vh",
};

export function CreateList() {
  const [list, setList] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const stored = loadFromLocalStorage();

    if (stored.length) {
      const toText = convertToCSV(stored);

      console.log(toText);
      setList(toText);
    }
  }, []);

  useEffect(() => {
    setData(list.split('\n').map(parseLine));
  }, [list]);

  const handleChange = (event) => {
    const text = event.target.value;

    setList(text);
  }

  const handleSave = () => {
    console.log(data);

    localStorage.setItem("buylist", JSON.stringify(data));

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
            value={list}
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
