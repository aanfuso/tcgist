import { logAnalyticsEvent } from 'lib/firebase/analytics';

export const BRAND = 'TCGist';

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

export const RARITY_TO_VALUE = {
  [COMMON]: 'C',
  [UNCOMMON]: 'U',
  [RARE]: 'R',
  [MYTHIC]: 'M',
};

export const NAVIGATION_ITEMS = [
  {
    anchor: '',
    text: 'Try TCGist',
    options: {
      variant: 'contained',
      target: '_blank',
      onClick: () => logAnalyticsEvent('click', { label: 'Try TCGist' }),
    },
  },
];

export const FOOTER_PROPS = {
  topText: 'Made with ❤️ for MTG',
};
