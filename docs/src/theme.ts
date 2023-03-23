import { defaultDarkModeOverride, Theme } from '@aws-amplify/ui-react';

export const baseTheme: Theme = {
  name: 'amplify-docs',
  tokens: {
    // fonts: {
    //   default: {
    //     variable: '',
    //     static: '',
    //   }
    // },
    borderWidths: {
      small: '1.5px',
    },
    radii: {
      large: '0.75rem',
    },
    colors: {
      // brand: {
      //   secondary: {
      //     10:  '{colors.teal.10}',
      //     20:  '{colors.teal.20}',
      //     40:  '{colors.teal.40}',
      //     60:  '{colors.teal.60}',
      //     80:  '{colors.teal.80}',
      //     90:  '{colors.teal.90}',
      //     100: '{colors.teal.100}',
      //   }
      // },
      red: {
        100: 'hsl(0, 79%, 14%)',
        90: 'hsl(0, 81%, 26%)',
        80: 'hsl(0, 82%, 42%)',
        60: 'hsl(0, 83%, 51%)',
        40: 'hsl(0, 80%, 67%)',
        20: 'hsl(0, 82%, 92%)',
        10: 'hsl(0, 100%, 99%)',
      },
      orange: {
        100: 'rgba(75,30,3)',
        90: 'rgba(113,45,4)',
        80: 'rgba(199,80,6)',
        60: 'rgba(236,114,17)',
        40: 'rgba(255,153,0)',
        20: 'rgba(255,230,192)',
        10: 'rgba(255,249,240)',
      },
      yellow: {
        100: 'hsl(60, 100%, 15%)',
        90: 'hsl(60, 100%, 20%)',
        80: 'hsl(60, 94%, 34%)',
        60: 'hsl(60, 67%, 57%)',
        40: 'hsl(60, 82%, 80%)',
        20: 'hsl(60, 58%, 90%)',
        10: 'hsl(60, 80%, 97%)',
      },
      lime: {
        10: '#f7fee7',
        20: '#d9f99d',
        40: '#a3e635',
        60: '#65a30d',
        80: '#3f6212',
        90: '#365314',
        100: '#365314',
      },
      green: {
        100: 'rgba(2,48,5)',
        90: 'rgba(3,72,7)',
        80: 'rgba(3,127,12)',
        60: 'rgba(41,173,50)',
        40: 'rgba(95,194,102)',
        20: 'rgba(202,235,204)',
        10: 'rgba(242,250,243)',
      },
      teal: {
        100: '#0A3233',
        90: '#0F4B4C',
        80: '#198486',
        60: '#21AFA6',
        40: '#85DED7',
        20: '#C2EFEB',
        10: '#E7F9F7',
      },
      blue: {
        100: 'rgba(4,43,80)',
        90: 'rgba(6,65,120)',
        80: 'rgba(9,114,211)',
        60: 'rgba(0,140,255)',
        40: 'rgba(106,186,252)',
        20: 'rgba(211,231,249)',
        10: 'rgba(242,248,253)',
      },
      purple: {
        100: 'rgba(44,39,74)',
        90: 'rgba(66,59,111)',
        80: 'rgba(116,104,196)',
        60: 'rgba(139,124,233)',
        40: 'rgba(187,184,255)',
        20: 'rgba(221,220,255)',
        10: 'rgba(247,247,255)',
      },
      pink: {
        100: 'rgba(77,0,26)',
        90: 'rgba(102,0,34)',
        80: 'rgba(149,4,52)',
        60: 'rgba(191,64,106)',
        40: 'rgba(232,125,161)',
        20: 'rgba(251,182,205)',
        10: 'rgba(254,230,238)',
      },
      neutral: {
        10: '#f6f8fa',
        20: '#e7ebf0',
        40: '#c8d1d9',
        60: '#89939F',
        80: '#474e55',
        90: '#242b32',
        100: '#12161a',
      },
      background: {
        success: '{colors.green.10}',
        info: '{colors.blue.10}',
        error: '{colors.red.10}',
        warning: '{colors.orange.10}',
      },
      // border: {
      //   primary: '{colors.neutral.40}',
      //   secondary: '{colors.neutral.20}',
      //   tertiary: '{colors.neutral.10}',
      // },
      // font: {
      //   success: '{colors.green.10}',
      //   info: '{colors.blue.10}',
      //   error: '{colors.red.10}',
      //   warning: '{colors.orange.10}',
      // },
    },
    components: {
      alert: {
        backgroundColor: '{colors.background.secondary}',
        alignItems: 'flex-start',
      },
      badge: {
        success: {
          color: '{colors.green.80}',
        },
        info: {
          color: '{colors.blue.80}',
        },
        error: {
          color: '{colors.red.80}',
        },
      },
      button: {
        // borderColor: '{colors.brand.primary.60}',
        // color: '{colors.brand.primary.80}',
        primary: {
          // this is not the exact color in the mocks
          backgroundColor: '{colors.brand.primary.20}',
          color: '{colors.brand.primary.100}',
          _hover: {
            backgroundColor: '{colors.brand.primary.40}',
            color: '{colors.brand.primary.100}',
          },
          _active: {
            backgroundColor: '{colors.brand.primary.60}',
            color: '{colors.brand.primary.100}',
          },
        },
      },
      card: {
        outlined: {
          borderColor: '{colors.border.tertiary}',
        },
      },
      fieldcontrol: {
        borderColor: '{colors.border.primary}',
      },
      togglebutton: {
        borderColor: '{components.fieldcontrol.borderColor}',
      },
      heading: {
        1: { fontWeight: '{fontWeights.bold}' },
        2: { fontWeight: '{fontWeights.bold}' },
        3: { fontWeight: '{fontWeights.bold}' },
        4: { fontWeight: '{fontWeights.bold}' },
        5: { fontWeight: '{fontWeights.bold}' },
        6: { fontWeight: '{fontWeights.bold}' },
      },
    },
  },
  overrides: [
    {
      colorMode: 'dark',
      tokens: {
        colors: {
          teal: {
            10: '#0A3233',
            20: '#0F4B4C',
            40: '#198486',
            60: '#21AFA6',
            80: '#85DED7',
            90: '#C2EFEB',
            100: '#E7F9F7',
          },
          neutral: {
            100: '#f6f8fa',
            90: '#e7ebf0',
            80: '#c8d1d9',
            60: '#89939F',
            40: '#474e55',
            20: '#242b32',
            10: '#12161a',
          },
          blue: {
            10: 'rgba(4,43,80)',
            20: 'rgba(6,65,120)',
            40: 'rgba(9,114,211)',
            60: 'rgba(0,140,255)',
            80: 'rgba(106,186,252)',
            90: 'rgba(211,231,249)',
            100: 'rgba(242,248,253)',
          },
          purple: {
            10: 'rgba(44,39,74)',
            20: 'rgba(66,59,111)',
            40: 'rgba(116,104,196)',
            60: 'rgba(139,124,233)',
            80: 'rgba(187,184,255)',
            90: 'rgba(221,220,255)',
            100: 'rgba(247,247,255)',
          },
          pink: {
            10: 'rgba(77,0,26)',
            20: 'rgba(102,0,34)',
            40: 'rgba(149,4,52)',
            60: 'rgba(191,64,106)',
            80: 'rgba(232,125,161)',
            90: 'rgba(251,182,205)',
            100: 'rgba(254,230,238)',
          },
          red: {
            10: 'hsl(0, 79%, 14%)',
            20: 'hsl(0, 81%, 26%)',
            40: 'hsl(0, 82%, 42%)',
            60: 'hsl(0, 83%, 51%)',
            80: 'hsl(0, 80%, 67%)',
            90: 'hsl(0, 82%, 92%)',
            100: 'hsl(0, 100%, 99%)',
          },
          orange: {
            10: 'rgba(75,30,3)',
            20: 'rgba(113,45,4)',
            40: 'rgba(199,80,6)',
            60: 'rgba(236,114,17)',
            80: 'rgba(255,153,0)',
            90: 'rgba(255,230,192)',
            100: 'rgba(255,249,240)',
          },
          yellow: {
            10: 'hsl(60, 100%, 15%)',
            20: 'hsl(60, 100%, 20%)',
            40: 'hsl(60, 94%, 34%)',
            60: 'hsl(60, 67%, 57%)',
            80: 'hsl(60, 82%, 80%)',
            90: 'hsl(60, 58%, 90%)',
            100: 'hsl(60, 80%, 97%)',
          },
          green: {
            10: 'rgba(2,48,5)',
            20: 'rgba(3,72,7)',
            40: 'rgba(3,127,12)',
            60: 'rgba(41,173,50)',
            80: 'rgba(95,194,102)',
            90: 'rgba(202,235,204)',
            100: 'rgba(242,250,243)',
          },

          font: {
            primary: '{colors.white}',
            secondary: '{colors.neutral.100}',
            tertiary: '{colors.neutral.90}',
            inverse: '{colors.neutral.10}',
          },

          background: {
            // primary: '{colors.black}',
            primary: '{colors.neutral.10}',
            secondary: '{colors.neutral.20}',
            tertiary: '{colors.neutral.40}',
          },

          // border: {
          //   primary: '{colors.neutral.40}',
          //   secondary: '{colors.neutral.20}',
          //   tertiary: '{colors.neutral.10}',
          // },
        },
      },
    },
  ],
};

// export const baseTheme: Theme = {
//   name: 'amplify-docs',
//   overrides: [defaultDarkModeOverride],
// };
