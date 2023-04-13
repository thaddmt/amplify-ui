import { createContextUtility } from '@aws-amplify/ui-react-core';
import { ErrorViewContextType } from './types';

const [ErrorViewContext, useErrorView] = createContextUtility<
  ErrorViewContextType | null,
  Required<ErrorViewContextType>
>({
  initialValue: {
    errorMessage: undefined,
    hasError: false,
  },
});

export { ErrorViewContext, useErrorView };
