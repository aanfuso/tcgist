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

export const DEFAULT_SET_STATS = {
  [BLACK]: {
    count: 1,
    total: 2,
    value: 50,
  },
  [BLUE]: {
    count: 1,
    total: 2,
    value: 50,
  },
  [COLORLESS]: {
    count: 1,
    total: 2,
    value: 50,
  },
  [COMMON]: {
    count: 1,
    total: 2,
    value: 50,
  },
  [GREEN]: {
    count: 1,
    total: 2,
    value: 50,
  },
  [MISSING]: [],
  [MYTHIC]: {
    count: 1,
    total: 2,
    value: 50,
  },
  [RARE]: {
    count: 1,
    total: 2,
    value: 50,
  },
  [RED]: {
    count: 1,
    total: 2,
    value: 50,
  },
  [UNCOMMON]: {
    count: 1,
    total: 2,
    value: 50,
  },
  [WHITE]: {
    count: 1,
    total: 2,
    value: 50,
  }
};

export const RARITY_TO_VALUE = {
  [COMMON]: 'C',
  [UNCOMMON]: 'U',
  [RARE]: 'R',
  [MYTHIC]: 'M',
};
