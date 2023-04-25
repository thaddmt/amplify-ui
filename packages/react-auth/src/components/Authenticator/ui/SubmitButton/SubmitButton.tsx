import React from 'react';

import { Prettify } from '@aws-amplify/ui';
import { Button } from '@aws-amplify/ui-react';

import { useSubmitButton } from '../../hooks';

type SubmitButtonProps = Prettify<Parameters<typeof Button>[0]>;

const SubmitButton = ({
  children,
  fontWeight = 'normal',
  isDisabled: overrideIsDisabled = false,
  variation = 'primary',
  type = 'submit',
  ...props
}: SubmitButtonProps): JSX.Element => {
  const { isDisabled: defaultIsDisabled, submitButtonText } = useSubmitButton();

  const isDisabled = overrideIsDisabled || defaultIsDisabled;

  return (
    <Button
      {...props}
      fontWeight={fontWeight}
      isDisabled={isDisabled}
      variation={variation}
      type={type}
    >
      {children ? children : submitButtonText}
    </Button>
  );
};

SubmitButton.displayName = 'SubmitButton';

export default SubmitButton;
