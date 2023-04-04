import { Prettify } from '@aws-amplify/ui';

import { Button, Flex } from '@aws-amplify/ui-react';

export type LinkButtonProps = Prettify<Parameters<typeof Button>[0]> & {
  key: string;
};

type LinkViewProps = Prettify<Parameters<typeof Flex>[0]> & {
  links?: LinkButtonProps[];
};

export type LinkViewComponent<P = {}> = React.ComponentType<LinkViewProps & P>;
