import { Prettify } from '@aws-amplify/ui';
import { Alert, Flex } from '@aws-amplify/ui-react';

export type ErrorAlertProps = Prettify<Parameters<typeof Alert>[0]>;

export type FlexProps = Prettify<Parameters<typeof Flex>[0]>;
