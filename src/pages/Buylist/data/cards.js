import { get } from "lib/request";

export const getCard = async ({ set, collectorNumber }) => {
  try {
    const response = await get(`/cards/${set}/${collectorNumber}`);

    return parseCard(response);
  } catch (error) {
    console.log('There was an error', error);

    return {};
  }
};

const parseCard = ({
  artist,
  card_faces: [frontFace, backFace] = [],
  collector_number: collectorNumber,
  image_uris,
  name,
  prices,
  scryfall_uri: scryfallUri,
  set_name: setName,
  set,
}) => {
  let imageUris = { front: { ...image_uris } };

  if (frontFace && backFace) {
    imageUris = {
      front: { ...frontFace.image_uris },
      back: { ...backFace.image_uris },
    };
  }

  return {
    artist,
    collectorNumber,
    imageUris,
    name,
    prices,
    scryfallUri,
    set,
    setName,
  }
};
