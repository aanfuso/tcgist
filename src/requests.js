
const SEARCH_URL = 'https://api.scryfall.com/cards/search';

export const getSet = async (setCode) => {
  const response = await fetch(`https://api.scryfall.com/sets/${setCode}`);
  const data = await response.json();

  return data;
};

const getSetCards = async (setCode, page = 1) => {
  const response = await fetch(`${SEARCH_URL}?page=${page}&order=set&q=%28game%3Apaper%29+set%3A${setCode}`);
  const data = await response.json();

  return data;
};

export const getFullSet = async (setCode, page = 1) => {
  const response = await getSetCards(setCode, page);

  if (response.has_more) {
    const more = await getFullSet(setCode, page + 1);

    response.data = [...response.data, ...more.data];
  }

  return response;
};
