import { defaultDarkModeOverride } from '@aws-amplify/ui-react';

export default {
  name: 'neutral-theme',
  tokens: {
    colors: {
      brand: {
        primary: {
          10: '{colors.neutral.10}',
          20: '{colors.neutral.20}',
          40: '{colors.neutral.40}',
          60: '{colors.neutral.60}',
          80: '{colors.neutral.80}',
          90: '{colors.neutral.90}',
          100: '{colors.neutral.100}',
        },
        secondary: {
          10: '{colors.neutral.10}',
          20: '{colors.neutral.20}',
          40: '{colors.neutral.40}',
          60: '{colors.neutral.60}',
          80: '{colors.neutral.80}',
          90: '{colors.neutral.90}',
          100: '{colors.neutral.100}',
        },
      },
    },
  },
  overrides: [defaultDarkModeOverride],
};
