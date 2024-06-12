export const convertToCSV = (arr) => {
  return arr.map(({
    quantity,
    name,
    set,
    collectorNumber,
    isPromo,
    isFoil,
  }) => (
    // `${quantity} ${name} (${set}) ${collectorNumber}${isFoil ? " *F*" : ""}`
    `${quantity},${name},${collectorNumber},${set},${isFoil ? "Foil" : "Normal"}`
  )).join('\n')
};

export function parseMoxLine(cardData) {
  const regex = /(\d+)\s(.+?)\s\((.+?)\)\s(\d+p?)(\s\*F\*)?(\s#\!.+)?/g;
  const match = regex.exec(cardData);

  if (match === null) return {};

  return {
    quantity: Number(match[1]),
    name: match[2],
    set: match[3],
    collectorNumber: match[4],
    isFoil: match[5] ? true : false,
  };
};

export function parseTCGLine(cardData) {
  const regex = /(\d+),(.+?),(\d+p?),(.+?),(.+?)/g;
  const match = regex.exec(cardData);

  if (match === null) return {};

  return {
    quantity: parseInt(match[1]),
    name: match[2].replace(/"/g, ''),
    set: match[4],
    collectorNumber: parseInt(match[3]),
    isFoil: match[5] === 'F' ? true : false,
  };
};
