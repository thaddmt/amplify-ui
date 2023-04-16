import { WithContextProps } from '@aws-amplify/ui-react-core';
import { UseAuthenticator } from '@aws-amplify/ui-react-core-auth';

import { FederatedProvider } from '@aws-amplify/ui';

export interface FederatedProviderViewContextType {
  providers?: FederatedProvider[] | undefined | null;
  toFederatedProvider?: UseAuthenticator['toFederatedSignIn'];
}

export type WithFederatedProviderViewProps<P> = WithContextProps<
  FederatedProviderViewContextType,
  P
>;
