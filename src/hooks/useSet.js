import { useState, useEffect } from 'react';

import { getSet, getFullSet } from 'requests';

import { RARITY_TO_VALUE } from 'constants';

const parseCard = (cardData) => {
  return {
    name: cardData.name,
    collectorNumber: cardData.collector_number,
    colors: cardData.colors || [],
    id: cardData.id,
    image: cardData.image_uris?.png,
    prices: cardData.prices,
    rarity: RARITY_TO_VALUE[cardData.rarity],
  };
};

export default function useSet(setCode) {
  const [set, setSet] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getSet(setCode).then((data) => setSet(data));

    getFullSet(setCode)
      .then(({ data }) => data.map(parseCard))
      .then(setCards);
  }, [setCode]);

  return { set, cards, setCards };
}
