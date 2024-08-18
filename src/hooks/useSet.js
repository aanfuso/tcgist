import { useState, useEffect } from 'react';
import { parseCard } from 'pages/Collection/utils';

import { getFullSet } from 'requests';

export default function useSet(setCode) {
  const [set, setSet] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(`https://api.scryfall.com/sets/${setCode}`)
      .then((response) => response.json())
      .then((data) => setSet(data));

    getFullSet(setCode)
      .then(({ data }) => data.map(parseCard))
      .then(setCards);
  }, [setCode]);

  return { set, cards, setCards };
}
