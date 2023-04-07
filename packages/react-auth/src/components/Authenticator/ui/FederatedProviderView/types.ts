import { Prettify, FederatedProvider } from '@aws-amplify/ui';
import { Button, Flex } from '@aws-amplify/ui-react';

export interface FederatedProviderIconProps {
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

// @todo not sure if we want to go this deep in to component slots.
// If that is the direction, may make more sense to do as top level
// prop and handle map calls in Authenticator itself
// export type FederatedProviderButtonComponent<P = {}> = React.ComponentType<
//   FederatedProviderButtonProps & P
// >;

export interface FederatedProviderOptions
  extends Required<Pick<FederatedProviderButtonProps, 'children' | 'onClick'>> {
  Icon?: FederatedProviderIconComponent;
}

type FederatedProviderViewProps = Prettify<Parameters<typeof Flex>[0]> & {
  // Button?: FederatedProviderButtonComponent;
  providerOptions?: FederatedProviderOptions[];
};

export type FederatedProviderViewComponent<P = {}> = React.ComponentType<
  FederatedProviderViewProps & P
>;
