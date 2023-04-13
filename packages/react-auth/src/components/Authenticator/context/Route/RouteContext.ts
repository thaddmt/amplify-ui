import { createContextUtility } from '@aws-amplify/ui-react-core';
import { RouteContextType } from './types';

const [RouteContext, useRoute] = createContextUtility<
  RouteContextType | null,
  Required<RouteContextType>
>({
  initialValue: null,
});

export { RouteContext, useRoute };
