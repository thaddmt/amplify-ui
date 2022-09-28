import { Theme } from '@aws-amplify/ui-react';

export const theme: Theme = {
  name: 'cabinTheme',
  tokens: {
    colors: {
      green: {
        10: { value: 'hsl(107, 12%, 95%)' },
      },
      teal: {
        80: { value: 'hsl(177, 26%, 37%)' },
      },
      orange: {
        10: { value: 'hsl(34, 20%, 95%)' },
        40: { value: 'hsl(34, 20%, 68%)' },
        60: { value: 'hsl(30, 15%, 54%)' },
        90: { value: 'hsl(36, 27%, 30%)' },
        100: { value: 'hsl(39, 25%, 15%)' },
      },
    },
    components: {
      heading: {
        2: {
          fontWeight: { value: '{fontWeights.bold}' },
          fontSize: { value: '{fontSizes.medium}' },
        },
      },
      rating: {
        filled: {
          color: { value: '{colors.teal.80}' },
        },
        empty: {
          color: { value: '{colors.green.10}' },
        },
      },
      fieldcontrol: {
        borderColor: { value: '{colors.orange.40}' },
        borderRadius: { value: '{radii.xl}' },
      },
      button: {
        color: { value: '{colors.orange.90}' },
        borderRadius: {
          value: '{radii.xl}',
        },
        _hover: {
          borderColor: { value: '{colors.orange.60}' },
          backgroundColor: { value: '{colors.orange.10}' },
          color: { value: '{colors.orange.100}' },
        },
      },
      authenticator: {
        router: {
          borderWidth: { value: '0' },
        },
      },
    },
  },
};
