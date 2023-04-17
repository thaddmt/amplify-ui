import { WithContextProps } from '@aws-amplify/ui-react-core';
import { UseAuthenticator } from '@aws-amplify/ui-react-core-auth';

import { NavigableRoute } from '@aws-amplify/ui';

export interface LinksViewContextType {
  links?: NavigableRoute[] | undefined | null;
  setNavigableRoute?: UseAuthenticator['setNavigableRoute'];
}

export type withLinkViewProps<P> = WithContextProps<LinksViewContextType, P>;
