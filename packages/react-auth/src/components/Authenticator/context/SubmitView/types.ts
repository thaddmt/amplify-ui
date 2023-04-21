import { WithContextProps } from '@aws-amplify/ui-react-core';

import { FieldValues, OnSubmit } from '../../Form';

export type SubmitViewContextType<T extends FieldValues = FieldValues> = {
  // defaultValues?: InitialValues<T>;
  isDisabled?: boolean | undefined;
  // onReset?: (values: T) => void;
  onSubmit?: OnSubmit<T> | undefined;
};

export type WithSubmitViewProps<P> = WithContextProps<SubmitViewContextType, P>;
