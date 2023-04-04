import React from 'react';

import { Prettify } from '@aws-amplify/ui';
import { Flex } from '@aws-amplify/ui-react';

type QRCodeViewProps = Prettify<Parameters<typeof Flex>[0]> & {
  copyTooltipText: string | ((hasCopied: boolean) => string);
  totpSecretCode: string;
  totpIssuer: string;
  totpUsername: string;
};

export type QRCodeViewComponent<P = {}> = React.ComponentType<
  QRCodeViewProps & P
>;
