import React from 'react';

import { isFunction, isString, Prettify } from '@aws-amplify/ui';
import {
  resolveChildrenOrCallback,
  useTimeout,
} from '@aws-amplify/ui-react-core';
import { Button } from '@aws-amplify/ui-react';

import { createDisplayName } from '../utils';

const RESET_TOOTIP_TEXT_DELAY = 2000;

type CopyButtonChildren = React.ReactNode | ((hasCopied: boolean) => string);
type CopyButtonProps = Prettify<
  Omit<Parameters<typeof Button>[0], 'children'> & {
    target?: string;
    children?: CopyButtonChildren;
  }
>;
type CopyButtonComponent<P = {}> = React.ComponentType<CopyButtonProps & P>;

const CopyButton: CopyButtonComponent = ({
  children,
  target,
  onClick,
  ...props
}): JSX.Element => {
  const [hasCopied, setHasCopied] = React.useState(false);

  // @todo make util hook?
  // assign `undefined` as the value of `delay` to prevent `useTimeout`
  // from running callback
  const delay = hasCopied ? RESET_TOOTIP_TEXT_DELAY : undefined;
  useTimeout(() => setHasCopied(false), delay);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isString(target)) {
      navigator.clipboard.writeText(target);
      setHasCopied(true);
    }

    if (isFunction(onClick)) {
      onClick(event);
    }
  };

  const resolvedChildren = resolveChildrenOrCallback(children, hasCopied);

  return (
    <Button {...props} onClick={handleClick}>
      {resolvedChildren}
    </Button>
  );
};

CopyButton.displayName = createDisplayName('CopyButton');

export default CopyButton;
