import React from 'react';

import { Prettify } from '@aws-amplify/ui';
import { Button } from '@aws-amplify/ui-react';

type SubmitButtonProps = Prettify<Parameters<typeof Button>[0]>;

export type SubmitButtonComponent<P = {}> = React.ComponentType<
  SubmitButtonProps & P
>;

// @todo maybe needs ref?
const SubmitButton: SubmitButtonComponent = ({
  fontWeight = 'normal',
  variation = 'primary',
  type = 'submit',
  ...props
}) => (
  <Button
    {...props}
    fontWeight={fontWeight}
    variation={variation}
    type={type}
  />
);

SubmitButton.displayName = 'SubmitButton';

export default SubmitButton;
