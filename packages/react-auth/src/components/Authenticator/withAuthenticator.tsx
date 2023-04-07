import React from 'react';
import { Authenticator } from './Authenticator';
import { AuthenticatorProps } from './types';

export type WithAuthenticatorOptions = Omit<AuthenticatorProps, 'children'>;

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/connected-components/authenticator)
 */
export function withAuthenticator<Props extends JSX.IntrinsicAttributes = {}>(
  Component: React.ComponentType<Props>,
  options: WithAuthenticatorOptions = {}
): (props: Props) => JSX.Element {
  const { variation = 'modal' } = options;

  return function WrappedWithAuthenticator(props: Props) {
    return (
      <Authenticator variation={variation} {...options}>
        <Component {...props} />
      </Authenticator>
    );
  };
}
