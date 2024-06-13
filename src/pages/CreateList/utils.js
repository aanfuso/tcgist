import { MOXFIELD, TCGPLAYER, DELVERSCAN } from "utils/constants";

const TEMPLATE_BY_PLATFORM = {
  [MOXFIELD]: ({
    quantity,
    name,
    set,
    collectorNumber,
    isFoil,
  }) => (
    `${quantity} ${name} (${set}) ${collectorNumber}${isFoil ? " *F*" : ""}`
  ),
  [TCGPLAYER]: ({
    quantity,
    name,
    set,
    collectorNumber,
    isFoil,
  }) => (
    `${quantity},${name},${collectorNumber},${set},${isFoil ? "Foil" : "Normal"}`
  )
}

export const convertToCSV = (arr, platform) => {
  const template = TEMPLATE_BY_PLATFORM[platform];

  return arr.map(template).join("\n")
};

const REGEX_BY_PLATFORM = {
  [MOXFIELD]: /(\d+)\s(.+?)\s\((.+?)\)\s(\d+p?)(\s\*F\*)?(\s#\!.+)?/g,
  [TCGPLAYER]: /(\d+),(.+?),(\d+p?),(.+?),(.+?)/g,
};

const INDEX_BY_PLATFORM = {
  [MOXFIELD]: {
    quantity: 1,
    name: 2,
    set: 3,
    collectorNumber: 4,
    isFoil: 5,
  },
  [TCGPLAYER]: {
    quantity: 1,
    name: 2,
    collectorNumber: 3,
    set: 4,
    isFoil: 5,
  }
};

export function parseList(text, platform) {
  if (!text) return [];

  const rows = text.split("\n");//.filter((line) => line !== "");

  const index = INDEX_BY_PLATFORM[platform];

  return rows.map((cardData, i) => {
    const regex = REGEX_BY_PLATFORM[platform];
    const matches = regex.exec(cardData);
    regex.lastIndex = 0;

    if (matches === null) return {};

    let isFoil = false;
    if (platform === MOXFIELD) {
      isFoil = matches[index.isFoil] ? true : false;
    } else if (platform === TCGPLAYER) {
      isFoil = matches[index.isFoil] === "F";
    }

    return {
      quantity: parseInt(matches[index.quantity]),
      name: matches[index.name],
      set: matches[index.set],
      collectorNumber: matches[index.collectorNumber],
      isFoil,
    };
  });
};
