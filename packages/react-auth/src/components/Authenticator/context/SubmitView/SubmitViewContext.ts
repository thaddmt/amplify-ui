import { createContextUtility } from '@aws-amplify/ui-react-core';

import { SubmitViewContextType } from './types';

const [SubmitViewContext, useSubmitView] = createContextUtility<
  SubmitViewContextType | null,
  Required<SubmitViewContextType>
>({
  initialValue: {
    isDisabled: undefined,
    onSubmit: undefined,
  },
});

export { SubmitViewContext, useSubmitView };
