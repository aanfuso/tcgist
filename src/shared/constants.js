import { logAnalyticsEvent } from 'lib/firebase/analytics';

export const BRAND = 'TCGist';

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
