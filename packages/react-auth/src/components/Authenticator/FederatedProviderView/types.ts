import {
  FederatedIdentityProviders,
  Prettify,
  FederatedProvider,
} from '@aws-amplify/ui';
import { Button, Flex } from '@aws-amplify/ui-react';

type IconComponent = React.ComponentType;

export type ProviderIconComponents = Record<
  FederatedIdentityProviders,
  IconComponent
>;

export type FederatedProviderButtonProps = Prettify<
  Parameters<typeof Button>[0]
> & {
  Icon?: IconComponent;
};

type FederatedProviderViewProps = Prettify<Parameters<typeof Flex>[0]> & {
  providers?: FederatedProvider[];
  providerButtonText?: string | ((provider: string) => string);
};

export type FederatedProviderViewComponent<P = {}> = React.ComponentType<
  FederatedProviderViewProps & P
>;
