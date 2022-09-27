/*
 * 📕 Part 2 -UPDATE THEME
 *
 * 👉 STEP 1
 *
 * Change the default colors for green, teal, orange and red
 *
 * 👉 STEP 2
 *
 * Make the heading 2 font weight to  bold and fontsize to medium
 *
 * 👉 STEP 3
 *
 * Set the ratings filled color to Teal 80%
 *
 * 👉 STEP 4
 * Set the background color, color and border color of the hover event of the button
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
       * 10: { value: 'hsl(107, 12%, 95%)' },
       */
    },
    components: {
      heading: {
        /**
         * 👉 STEP 2
         */
      },
      rating: {
        /**
         * 👉 STEP 3
         */
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
