import {
  FederatedIdentityProviders,
  Prettify,
  SocialProvider,
} from '@aws-amplify/ui';
import { Button, Flex } from '@aws-amplify/ui-react';

type IconComponent = React.ComponentType;

export type ProviderIconComponents = Record<
  FederatedIdentityProviders,
  IconComponent
>;

export type SocialProviderButtonProps = Prettify<
  Parameters<typeof Button>[0]
> & {
  Icon?: IconComponent;
};

type SocialProviderViewProps = Prettify<Parameters<typeof Flex>[0]> & {
  providers?: SocialProvider[];
  providerButtonText?: string | ((provider: string) => string);
};

export type SocialProviderViewComponent<P = {}> = React.ComponentType<
  SocialProviderViewProps & P
>;
