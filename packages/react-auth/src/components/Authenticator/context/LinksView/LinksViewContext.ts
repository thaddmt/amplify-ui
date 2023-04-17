import { createContextUtility } from '@aws-amplify/ui-react-core';

import { LinksViewContextType } from './types';

const [LinksViewContext, useLinksView] = createContextUtility<
  LinksViewContextType,
  Required<LinksViewContextType>
>({
  initialValue: {
    links: undefined,
    setNavigableRoute: undefined,
  },
});

export { LinksViewContext, useLinksView };
