export const loadFromLocalStorage = () => {
  const buylist = localStorage.getItem("buylist");

  if (buylist) {
    return JSON.parse(buylist);
  }

  return [];
};
