import { createContextUtility } from '@aws-amplify/ui-react-core';
import { FieldControlContextType } from './types';

const [FieldControlContext, useFieldControl] = createContextUtility<
  FieldControlContextType | null,
  FieldControlContextType
>({ initialValue: null });

export { FieldControlContext, useFieldControl };
