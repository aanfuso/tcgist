export const convertToCSV = (arr) => {
  return arr.map(it => {
    return it.line
  }).join('\n')
};

const parseByApp = {
  mox: {
    setIndex: ["(", ")"],
    nameIndex: [" ", " ("],
  },
  tcg: {
    setIndex: ["[", "]"],
    nameIndex: [" ", " ["],
    variantIndex: ["(", ")"],
  },
};

export const parseLine = (line) => {
  const app = "tcg";
  const { setIndex, nameIndex, variantIndex } = parseByApp[app];
  const quantity = Number(line.substring(0, line.indexOf(" ")));
  const set = line.substring(
    line.indexOf(setIndex[0]) + 1,
    line.indexOf(setIndex[1])
  );
  const name = line.substring(
    line.indexOf(nameIndex[0]) + 1,
    line.indexOf(nameIndex[1])
  );
  const variant = line.substring(
    line.indexOf(variantIndex[0]) + 1,
    line.indexOf(variantIndex[1])
  );

  return {
    quantity,
    name,
    set,
    variant,
    line,
  };
};
