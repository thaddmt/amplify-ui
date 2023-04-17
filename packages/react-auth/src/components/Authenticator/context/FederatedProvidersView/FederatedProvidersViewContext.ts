import { createContextUtility } from '@aws-amplify/ui-react-core';

import { FederatedProvidersViewContextType } from './types';

const [FederatedProvidersViewContext, useFederatedProvidersView] =
  createContextUtility<
    FederatedProvidersViewContextType,
    Required<FederatedProvidersViewContextType>
  >({
    initialValue: {
      providers: undefined,
      toFederatedProvider: undefined,
    },
  });

export { FederatedProvidersViewContext, useFederatedProvidersView };
