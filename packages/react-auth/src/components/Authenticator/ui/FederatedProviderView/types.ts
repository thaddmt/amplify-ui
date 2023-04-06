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

export interface FederatedProviderOptions
  extends Required<Pick<FederatedProviderButtonProps, 'children' | 'onClick'>> {
  Icon?: FederatedProviderIconComponent;
}

type FederatedProviderViewProps = Prettify<Parameters<typeof Flex>[0]> & {
  providerOptions?: FederatedProviderOptions[];
};

export type FederatedProviderViewComponent<P = {}> = React.ComponentType<
  FederatedProviderViewProps & P
>;
