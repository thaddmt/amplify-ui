import { Prettify, FederatedProvider } from '@aws-amplify/ui';
import { Button, Flex } from '@aws-amplify/ui-react';

interface FederatedProviderIconProps {
  provider?: FederatedProvider;
}

export type FederatedProviderIconComponent =
  React.ComponentType<FederatedProviderIconProps>;

export type FederatedProviderButtonProps = Prettify<
  // omit default `variation` prop for override
  Omit<Parameters<typeof Button>[0], 'variation'>
> & {
  Icon?: FederatedProviderIconComponent;
};

export type FederatedProviderViewProps = Prettify<Parameters<typeof Flex>[0]>;
