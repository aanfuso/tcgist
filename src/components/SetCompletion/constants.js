import { W, U, B, R, G, C } from 'components/icons';

export const COMMON = 'common';
export const UNCOMMON = 'uncommon';
export const RARE = 'rare';
export const MYTHIC = 'mythic';
export const WHITE = 'white';
export const BLUE = 'blue';
export const BLACK = 'black';
export const RED = 'red';
export const GREEN = 'green';
export const COLORLESS = 'colorless';
export const MISSING = 'missing';

export const STAT_COMMON = {
  label: COMMON,
  symbol: '',
  color: '',
};
export const STAT_UNCOMMON = {
  label: UNCOMMON,
  symbol: '',
  color: 'silver',
};
export const STAT_RARE = {
  label: RARE,
  symbol: '',
  color: 'gold',
};
export const STAT_MYTHIC = {
  label: MYTHIC,
  symbol: '',
  color: 'red',
};
export const STAT_WHITE = {
  label: WHITE,
  symbol: <W />,
  color: '',
};
export const STAT_BLUE = {
  label: BLUE,
  symbol: <U />,
  color: '',
};
export const STAT_BLACK = {
  label: BLACK,
  symbol: <B />,
  color: '',
};
export const STAT_RED = {
  label: RED,
  symbol: <R />,
  color: '',
};
export const STAT_GREEN = {
  label: GREEN,
  symbol: <G />,
  color: '',
};
export const STAT_COLORLESS = {
  label: COLORLESS,
  symbol: <C />,
  color: '',
}

export const STATS = [
  STAT_COMMON,
  STAT_UNCOMMON,
  STAT_RARE,
  STAT_MYTHIC,
  STAT_WHITE,
  STAT_BLUE,
  STAT_BLACK,
  STAT_RED,
  STAT_GREEN,
  STAT_COLORLESS,
];
