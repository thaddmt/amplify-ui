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
          <Image
            width="100%"
            height="300px"
            objectFit="cover"
            alt={thumbnailAlt ?? ''}
            src={thumbnail ?? ''}
            borderRadius="medium"
          ></Image>
          <Flex alignItems="center">
            <Heading level={2} isTruncated={true}>
              {name}
            </Heading>
            <Rating
              value={rating ?? 0}
              size="small"
              gap="xxxs"
              marginLeft="auto"
            ></Rating>
          </Flex>
          <Flex gap="xxxs" alignItems="center" color="neutral.80">
            <Icon as={BiBed} aria-hidden="true"></Icon> {beds} bed
          </Flex>
          <View>
            <Text as="span" fontWeight="bold">
              ${rate}
            </Text>
            <Text as="span" color="neutral.80">
              {' '}
              / night
            </Text>
          </View>
        </Flex>
      </Card>
    </Link>
  );
}
