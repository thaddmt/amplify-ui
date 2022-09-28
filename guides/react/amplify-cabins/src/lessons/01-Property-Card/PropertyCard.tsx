/*
 * 📕 01 - PROPERTY CARD
 *
 *
 * 👉 STEP 1
 *
 * Add a thumbnail image for the property with a height of 300px and a width of 100%.
 * - To this image, add a borderRadius using a style prop with a 'medium' radius.
 * - Be sure to add alt text! (Hint: Look at the props available on PropertyCard).
 *
 * - Make your browser smaller and see how the image responds. What prop and
 * value on the Image could we use to make the image still fit 100% but no longer
 * look stretched?
 * (Hint: Check out the Image component docs demo for objectFit
 * https://ui.docs.amplify.aws/react/components/image#demo )
 *
 * 👉 STEP 2
 *
 * Add a Rating with size 'small' and a gap of 'xxxs'.
 *
 * 👉 STEP 3
 *
 * Add an Icon for bed. (Hint: The bed icon is already imported.)
 * - Convert the div currently wrapping the bed icon and accompanying
 * text to a Flex component.
 * - Add a 'xxxs' gap to this new Flex component.
 * - Add a flex layout rule to this Flex component to center the Icon with the text.
 * (Hint: how can we use alignItems?)
 * - On the Flex component, add a color style prop using the '80' color in the neutral range.
 * - How can we hide the icon to screen readers since it is decorative?
 * (Hint: what ARIA property can we pass to the Icon component to make it hidden?)
 *
 * 👉 STEP 4
 *
 * Add an H2 heading with the properties name.
 * - Use the truncated prop to keep the name to one line.
 * Note: we'll adjust the font-size in the next lab!
 *
 * 👉 STEP 5
 *
 * Add a Text component to show the properties rate with a dollar sign.
 * - Make this new Text component and the one immediately following line up
 * on the same line.
 * (Hint: what value can we pass to the 'as' prop on each?
 * See Text demo: https://ui.docs.amplify.aws/react/components/text)
 *
 *
 *
 * 🔹 HINT
 *
 * The completed code is in the same directory!
 *
 * ✨ BONUS 1
 *
 *  Add a few badges to the card, for example "Good for pets" or "No deposit"
 *
 */

import {
  Card,
  Image,
  Heading,
  Icon,
  View,
  Text,
  Rating,
  Flex,
  Link,
} from '@aws-amplify/ui-react';
import { BiBed } from 'react-icons/bi';

import { PropertyProps } from '../../types';

export default function PropertyCard({
  name,
  thumbnail,
  thumbnailAlt,
  beds,
  rate,
  rating,
}: PropertyProps) {
  return (
    <Link href="/">
      <Card lineHeight="small">
        <Flex gap="xxs" direction="column">
          {/**
           * 👉 STEP 1
           *
           */}
          <Flex alignItems="center">
            {/**
             *
             * 👉 STEP 4
             *
             */}

            {/**
             *
             * 👉 STEP 2
             *
             */}
          </Flex>
          <div>
            {/**
             * 👉 STEP 3
             *
             */}
            {beds} bed
          </div>
          <View>
            {/**
             * 👉 STEP 5
             *
             */}
            <Text color="neutral.80"> / night</Text>
          </View>
        </Flex>
      </Card>
    </Link>
  );
}
