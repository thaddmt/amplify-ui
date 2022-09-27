/*
 * 📕 01 - PROPERTY CARD
 *
 *
 * 👉 STEP 1
 *
 * Add an image with height of 300px borderRadius medium
 *
 * 👉 STEP 2
 *
 * Add rating with size small and gap of xxxs
 *
 * 👉 STEP 3
 *
 * Add an Icon for bed
 *
 * 👉 STEP 4
 *
 * Add an h2 heading, make sure it can be truncated
 *
 * 👉 STEP 5
 *
 * Add a rate text with font weight bold
 *
 * 👉 STEP 6
 *
 * Add a '/night' text with a neutrol color
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
           * Add your image here
           *
           */}
          <Flex alignItems="center">
            {/**
             *
             * 👉 STEP 4
             *
             */}
            <Heading level={2} isTruncated={true}>
              {name}
            </Heading>
            {/**
             *
             * 👉 STEP 2
             *
             */}
          </Flex>
          {/**
           * 👉 STEP 3
           *
           * Your JSX should look something like
           *
           * You can find react icons here https://react-icons.github.io/react-icons/icons?name=bi
           *
           * Flex
           *  icon
           */}
          <View>
            {/**
             * 👉 STEP 5 and STEP 6
             *
             */}
          </View>
        </Flex>
      </Card>
    </Link>
  );
}
