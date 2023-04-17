import React from 'react';

import { Prettify } from '@aws-amplify/ui';
import { Button } from '@aws-amplify/ui-react';

import { useFormView } from '../../context';

type SubmitButtonProps = Prettify<Parameters<typeof Button>[0]>;

// @todo maybe needs ref?
const SubmitButton = ({
  fontWeight = 'normal',
  isDisabled: _isDisabled = false,
  onSubmit: _onSubmit,
  variation = 'primary',
  type = 'submit',
  ...props
}: SubmitButtonProps): JSX.Element => {
  const { isDisabled: __isDisabled } = useFormView();

  // const { isDisabled, onSubmit } = useFormState();

  const isDisabled = _isDisabled || __isDisabled;

  return (
    <Button
      {...props}
      fontWeight={fontWeight}
      isDisabled={isDisabled}
      variation={variation}
      type={type}
    />
  );
};

SubmitButton.displayName = 'SubmitButton';

export default SubmitButton;
