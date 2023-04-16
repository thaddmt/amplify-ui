import { createContextUtility } from '@aws-amplify/ui-react-core';

import { LinkProviderViewContextType } from './types';

const [LinkProviderViewContext, useLinkProviderView] = createContextUtility<
  LinkProviderViewContextType,
  Required<LinkProviderViewContextType>
>({
  initialValue: {
    links: undefined,
    setNavigableRoute: undefined,
  },
});

export { LinkProviderViewContext, useLinkProviderView };
