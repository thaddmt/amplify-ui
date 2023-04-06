import React from 'react';

import { isString, Prettify } from '@aws-amplify/ui';
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

const CopyButton: CopyButtonComponent = ({ children, target }): JSX.Element => {
  const [hasCopied, setHasCopied] = React.useState(false);

  // assigning `undefined` as the value of `delay` prevents `useTimeout`
  // from running the callback
  const delay = hasCopied ? RESET_TOOTIP_TEXT_DELAY : undefined;
  useTimeout(() => setHasCopied(false), delay);

  const handleClick = () => {
    if (isString(target)) {
      navigator.clipboard.writeText(target);
      setHasCopied(true);
    }
  };

  const resolvedChildren = resolveChildrenOrCallback(children, hasCopied);

  return <Button onClick={handleClick}>{resolvedChildren}</Button>;
};

CopyButton.displayName = createDisplayName('CopyButton');

export default CopyButton;
