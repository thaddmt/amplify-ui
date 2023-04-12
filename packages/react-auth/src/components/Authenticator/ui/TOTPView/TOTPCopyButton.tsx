import React from 'react';

import { isFunction, isString } from '@aws-amplify/ui';
import {
  resolveChildrenOrCallback,
  useTimeout,
} from '@aws-amplify/ui-react-core';
import { Button } from '@aws-amplify/ui-react';

import { useDisplayText } from '../../context';
import { createDisplayName } from '../utils';
import { useTOTPViewContext } from './ViewContext';
import { TOTPCopyButtonComponent } from './types';

const RESET_TOOTIP_TEXT_DELAY = 2000;

const TOTPCopyButton: TOTPCopyButtonComponent = ({
  children,
  onClick,
  ...props
}) => {
  const { totpSecretCode } = useTOTPViewContext();
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

  const resolvedChildren = resolveChildrenOrCallback(
    children ?? getCopyButtonText,
    hasCopied
  );

  return (
    <Button {...props} onClick={handleClick}>
      {resolvedChildren}
    </Button>
  );
};

TOTPCopyButton.displayName = createDisplayName('TOTPCopyButton');

export default TOTPCopyButton;
