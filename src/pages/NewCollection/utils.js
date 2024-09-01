import {
  COMMON,
  UNCOMMON,
  RARE,
  MYTHIC,
  WHITE,
  BLUE,
  BLACK,
  RED,
  GREEN,
  COLORLESS,
  MISSING,
} from "constants";

export const getStats = (cards) => {
  const totalMythic = cards.filter(card => card.rarity === 'M').length;
  const totalRare = cards.filter(card => card.rarity === 'R').length;
  const totalUncommon = cards.filter(card => card.rarity === 'U').length;
  const totalCommon = cards.filter(card => card.rarity === 'C').length;
  const totalWhite = cards.filter(card => card.colors.includes('W')).length;
  const totalBlue = cards.filter(card => card.colors.includes('U')).length;
  const totalBlack = cards.filter(card => card.colors.includes('B')).length;
  const totalRed = cards.filter(card => card.colors.includes('R')).length;
  const totalGreen = cards.filter(card => card.colors.includes('G')).length;
  const totalColorless = cards.filter(card => card.colors.length === 0).length;

  const collected = cards.filter(card => card.collected);

  const oneOfEachMythic = collected.filter(card => card.rarity === 'M').length;
  const oneOfEachRare = collected.filter(card => card.rarity === 'R').length;
  const oneOfEachUncommon = collected.filter(card => card.rarity === 'U').length;
  const oneOfEachCommon = collected.filter(card => card.rarity === 'C').length;

  const oneOfEachWhite = collected.filter(card => card.colors.includes('W')).length;
  const oneOfEachBlue = collected.filter(card => card.colors.includes('U')).length;
  const oneOfEachBlack = collected.filter(card => card.colors.includes('B')).length;
  const oneOfEachRed = collected.filter(card => card.colors.includes('R')).length;
  const oneOfEachGreen = collected.filter(card => card.colors.includes('G')).length;
  const oneOfEachColorless = collected.filter(card => card.colors.length === 0).length;

  return {
    [COMMON]: {
      value: (oneOfEachCommon / totalCommon).toFixed(2) * 100,
      total: totalCommon,
      count: oneOfEachCommon,
    },
    [UNCOMMON]: {
      value: (oneOfEachUncommon / totalUncommon).toFixed(2) * 100,
      total: totalUncommon,
      count: oneOfEachUncommon,
    },
    [RARE]: {
      value: (oneOfEachRare / totalRare).toFixed(2) * 100,
      total: totalRare,
      count: oneOfEachRare,
    },
    [MYTHIC]: {
      value: (oneOfEachMythic / totalMythic).toFixed(2) * 100,
      total: totalMythic,
      count: oneOfEachMythic,
    },
    [WHITE]: {
      value: (oneOfEachWhite / totalWhite).toFixed(2) * 100,
      total: totalWhite,
      count: oneOfEachWhite,
    },
    [BLUE]: {
      value: (oneOfEachBlue / totalBlue).toFixed(2) * 100,
      total: totalBlue,
      count: oneOfEachBlue,
    },
    [BLACK]: {
      value: (oneOfEachBlack / totalBlack).toFixed(2) * 100,
      total: totalBlack,
      count: oneOfEachBlack,
    },
    [RED]: {
      value: (oneOfEachRed / totalRed).toFixed(2) * 100,
      total: totalRed,
      count: oneOfEachRed,
    },
    [GREEN]: {
      value: (oneOfEachGreen / totalGreen).toFixed(2) * 100,
      total: totalGreen,
      count: oneOfEachGreen,
    },
    [COLORLESS]: {
      value: (oneOfEachColorless / totalColorless).toFixed(2) * 100,
      total: totalColorless,
      count: oneOfEachColorless,
    },
    [MISSING]: [
      ...cards.filter(card => !card.collected).map(card => card.collectorNumber),
    ],
  };
};

export const mergeCards = ({ cards, list }) => {
  const collectionIDs = list.map(({ number }) => number);

  return cards?.map((card) => {
    const inCollection = collectionIDs.includes(card.collectorNumber);

    let regularQty = 0;
    let foilQty = 0;
    if (inCollection) {
      const entries = list.filter(({ number }) => number === card.collectorNumber);

      [regularQty, foilQty] = entries.reduce((acc, entry) => {
        if (entry.foil) {
          acc[1] += entry.quantity;
        } else {
          acc[0] += entry.quantity;
        }

        return acc;
      }, [0, 0]);
    }

    return {
      collected: inCollection,
      foilQty,
      id: card.id,
      owned: (regularQty + foilQty) > 0,
      price: card.prices.usd,
      regularQty,
      ...card,
    };
  });
};
