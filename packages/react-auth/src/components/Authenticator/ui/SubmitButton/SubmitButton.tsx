import React from 'react';

import { Prettify } from '@aws-amplify/ui';
import { Button } from '@aws-amplify/ui-react';

import { useDisplayText } from '../../context';
import { useRoute, useSubmit } from '../../hooks';

type SubmitButtonProps = Prettify<Parameters<typeof Button>[0]>;

const SubmitButton = ({
  children,
  fontWeight = 'normal',
  isDisabled: _isDisabled = false,
  onSubmit: _onSubmit,
  variation = 'primary',
  type = 'submit',
  ...props
}: SubmitButtonProps): JSX.Element => {
  const { isDisabled: __isDisabled } = useSubmit();

  const { route } = useRoute();
  const { getSubmitButtonText } = useDisplayText();

  const isDisabled = _isDisabled || __isDisabled;

  return (
    <Button
      {...props}
      fontWeight={fontWeight}
      isDisabled={isDisabled}
      variation={variation}
      type={type}
    >
      {children ? children : getSubmitButtonText(route)}
    </Button>
  );
};

SubmitButton.displayName = 'SubmitButton';

export default SubmitButton;
