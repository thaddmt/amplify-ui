import React from 'react';

import { Prettify } from '@aws-amplify/ui';
import { Flex } from '@aws-amplify/ui-react';

type TOTPViewProps = Prettify<Parameters<typeof Flex>[0]> & {
  totpSecretCode: string | undefined;
  totpIssuer: string | undefined;
  totpUsername: string | undefined;
};

export type TOTPViewComponent<P = {}> = React.ComponentType<TOTPViewProps & P>;
