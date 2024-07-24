import { useState, useEffect } from "react";

const SYMBOLS = ['{W}', '{U}', '{B}', '{R}', '{G}', '{C}' ];

const getSymbology = async () => {
  const response = await fetch('https://api.scryfall.com/symbology');
  const data = await response.json();

  return data;
}

const useSymbology = () => {
  const [symbology, setSymbology] = useState([]);

  useEffect(() => {
    async function fetchSymbology() {
      const symbology = await getSymbology();
      const symbols = symbology.data
        .filter(({ symbol }) => SYMBOLS.includes(symbol))
        .reduce((acc, { loose_variant, svg_uri }) => {
          acc[loose_variant] = svg_uri;

          return acc;
        }, {});

      setSymbology(symbols);
    }

    fetchSymbology();
  }, [])

  return symbology;
};

export default useSymbology;
