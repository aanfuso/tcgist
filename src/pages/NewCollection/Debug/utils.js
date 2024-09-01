export const parseList = (text) => {
  const regex = /"([^"]*?)"/g;
  const rows = text.split('\r\n').filter(i => i);

  return rows.map((cardData) => {
    const matches = cardData.match(regex)
      .map((field) => {
        return field?.replace(/"/g, '');
      });

    if (!matches) return null;

    return {
      quantity: parseInt(matches[0]),
      name: matches[2],
      set: matches[3],
      foil: matches[6] === 'foil',
      number: matches[9],
    };
  });
};
