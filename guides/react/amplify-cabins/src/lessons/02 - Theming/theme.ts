/*
 * 📕 Part 2 -UPDATE THEME
 *
 * 🛑 Do the step in src/index.tsx before working on this file.
 *
 * 👉 STEP 1
 *
 * Change the provided base colors in the colors object of the theme:
 *
 * teal.80 = hsl(177, 26%, 37%)
 *
 * green.10 = hsl(107, 12%, 95%)
 *
 * orange.10 = hsl(34, 20%, 95%)
 * orange.40 = hsl(34, 20%, 68%)
 * orange.60 = hsl(30, 15%, 54%)
 * orange.90 = hsl(36, 27%, 30%)
 * orange.100 = hsl(39, 25%, 15%)
 *
 *
 * 👉 STEP 2
 *
 * Make the Heading level 2 font weight bold and change the fontsize to medium.
 * (Hint: See the theming docs for Heading
 *  https://ui.docs.amplify.aws/react/components/heading#theme )
 *
 * 👉 STEP 3
 *
 * Add `rating: {}` to our theme's components object
 * - Set the filled color to teal.80
 * - Set the empty color to green.10
 * (Hint: See the theming docs for Rating
 * https://ui.docs.amplify.aws/react/components/rating#theme )
 *
 * 👉 STEP 4
 * Add a `_hover: {}` theme to the Button component.
 * - Set the hover backgroundColor to orange.10
 * - Set the hover color to orange.100
 * - Set the hover borderColor to orange.60
 *
 *
 * BONUS:
 *
 * Can you change the background color of all the cards?
 *
 * 🔹 HINT
 *
 * The completed code is in the same directory!
 *
 */
import { Theme } from '@aws-amplify/ui-react';

export const theme: Theme = {
  name: 'cabinTheme',
  tokens: {
    colors: {
      /**
       * 👉 STEP 1
       *
       * HINT: Use  this format:
       * [colorName] : {
       *    10: { value: 'hsl(107, 12%, 95%)' },
       * }
       */
    },
    components: {
      heading: {
        /**
         * 👉 STEP 2
         */
      },

      /**
       * 👉 STEP 3
       */

      fieldcontrol: {
        borderColor: { value: '{colors.orange.40}' },
        borderRadius: { value: '{radii.xl}' },
      },
      button: {
        color: { value: '{colors.orange.90}' },
        borderRadius: {
          value: '{radii.xl}',
        },
        /**
         * 👉 STEP 4
         */
      },
      authenticator: {
        router: {
          borderWidth: { value: '0' },
        },
      },
    },
  },
};
