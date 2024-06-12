export const convertToCSV = (arr) => {
  return arr.map(({
    quantity,
    name,
    set,
    collectorNumber,
    isPromo,
    isFoil,
  }) => (
    `${quantity} ${name} (${set}) ${collectorNumber}${isFoil ? " *F*" : ""}`
  )).join('\n')
};

export function parseLine(cardData) {
  const regex = /(\d+)\s(.+?)\s\((.+?)\)\s(\d+p?)(\s\*F\*)?(\s#\!.+)?/g;
  const match = regex.exec(cardData);

  if (match === null) return {};

  const quantity = match[1];
  const name = match[2];
  const set = match[3];
  const collectorNumber = match[4];
  const isFoil = match[5] ? true : false;

  return {
    quantity: Number(quantity),
    name,
    set: set.toLowerCase(),
    collectorNumber,
    isFoil,
  };
};
