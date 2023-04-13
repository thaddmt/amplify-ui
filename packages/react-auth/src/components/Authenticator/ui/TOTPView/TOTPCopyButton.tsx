import React from 'react';

import { isFunction, isString } from '@aws-amplify/ui';
import {
  resolveChildrenOrCallback,
  useTimeout,
} from '@aws-amplify/ui-react-core';
import { Button } from '@aws-amplify/ui-react';

import { useDisplayText, useTOTPView } from '../../context';
import { createDisplayName } from '../utils';
import { TOTPCopyButtonComponent } from './types';

const RESET_TOOTIP_TEXT_DELAY = 2000;

const TOTPCopyButton: TOTPCopyButtonComponent = ({
  children,
  onClick,
  ...props
}) => {
  const { totpSecretCode } = useTOTPView();
  const [hasCopied, setHasCopied] = React.useState(false);

  const { getCopyButtonText } = useDisplayText();

  // @todo make util hook?
  // assign `undefined` as the value of `delay` to prevent `useTimeout`
  // from running callback
  const delay = hasCopied ? RESET_TOOTIP_TEXT_DELAY : undefined;
  useTimeout(() => setHasCopied(false), delay);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isString(totpSecretCode)) {
      navigator.clipboard.writeText(totpSecretCode);
      setHasCopied(true);
    }

    if (isFunction(onClick)) {
      onClick(event);
    }
  };

  return (
    <Button {...props} onClick={handleClick}>
      {children
        ? children
        : resolveChildrenOrCallback(getCopyButtonText, hasCopied)}
    </Button>
  );
};

TOTPCopyButton.displayName = createDisplayName('TOTPCopyButton');

export default TOTPCopyButton;
