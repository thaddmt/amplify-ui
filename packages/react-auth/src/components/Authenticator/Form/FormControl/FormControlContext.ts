import { createContextUtility } from '@aws-amplify/ui-react-core';
import { FormControlContextType } from './types';

const [FormControlContext, useFormControl] = createContextUtility<
  FormControlContextType | null,
  FormControlContextType
>({ initialValue: null });

export { FormControlContext, useFormControl };
