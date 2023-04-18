import { createContextUtility } from '@aws-amplify/ui-react-core';

import { SubmitControlContextType } from './types';

const [SubmitControlContext, useSubmitControl] = createContextUtility<
  SubmitControlContextType | null,
  Required<SubmitControlContextType>
>({
  initialValue: {
    isDisabled: undefined,
    onSubmit: undefined,
  },
});

export { SubmitControlContext, useSubmitControl };
