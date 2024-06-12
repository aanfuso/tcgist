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

export function parseLineA(cardData) {
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
    set,
    collectorNumber,
    isFoil,
  };
};

export function parseLine(line) {
  const regex = /(\d+),(.+?),(\d+p?),(.+?),(.+?)/g;
  const fields = regex.exec(line);

  console.log("fields", fields);
  if (fields === null) return {};

  return {
    quantity: parseInt(fields[1]),
    name: fields[2].replace(/"/g, ''),
    set: fields[4],
    collectorNumber: parseInt(fields[3]),
    isFoil: fields[5] === 'F' ? true : false,
  };
};
