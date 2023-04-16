import { createContextUtility } from '@aws-amplify/ui-react-core';

import { FederatedProviderViewContextType } from './types';

const [FederatedProviderViewContext, useFederatedProviderView] =
  createContextUtility<
    FederatedProviderViewContextType,
    Required<FederatedProviderViewContextType>
  >({
    initialValue: {
      providers: undefined,
      toFederatedProvider: undefined,
    },
  });

export { FederatedProviderViewContext, useFederatedProviderView };
