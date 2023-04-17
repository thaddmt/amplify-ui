import { createContextUtility } from '@aws-amplify/ui-react-core';

import { FormViewContextType } from './types';

const [FormViewContext, useFormView] = createContextUtility<
  FormViewContextType | null,
  Required<FormViewContextType>
>({
  initialValue: {
    isDisabled: undefined,
    onSubmit: undefined,
  },
});

export { FormViewContext, useFormView };
