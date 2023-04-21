import React from 'react';

import { useAuthenticator } from '@aws-amplify/ui-react-core-auth';

import { createDisplayName } from '../../ui/utils';

import { TOTPViewContext } from './TOTPViewContext';
import { TOTPViewContextType, WithTOTPViewProps } from './types';

const DEFAULT_TOTP_ISSUER = 'AWSCognito';

const TOTPViewProvider = ({
  children,
  totpIssuer: overrideTOTPIssuer,
  totpSecretCode: overrideTotpSecretCode,
  totpUsername: overrideTotpUsername,
}: TOTPViewContextType & { children?: React.ReactNode }) => {
  const { totpSecretCode: defaultTotpSecretCode, user } = useAuthenticator(
    ({ totpSecretCode, user }) => [totpSecretCode, user]
  );

  const totpIssuer = overrideTOTPIssuer ?? DEFAULT_TOTP_ISSUER;
  const totpSecretCode = overrideTotpSecretCode ?? defaultTotpSecretCode;
  const totpUsername = overrideTotpUsername ?? user?.username;

  const value = React.useMemo(
    () => ({ totpIssuer, totpUsername, totpSecretCode }),
    [totpIssuer, totpUsername, totpSecretCode]
  );

  return (
    <TOTPViewContext.Provider value={value}>
      {children}
    </TOTPViewContext.Provider>
  );
};

export function withTOTPView<
  C extends React.ComponentType<any>,
  P extends React.ComponentProps<C>,
  Props extends WithTOTPViewProps<P>
>(Component: C): (props: Props) => JSX.Element {
  const TOTPView = ({
    totpIssuer,
    totpSecretCode,
    totpUsername,
    ...props
  }: Props) => (
    <TOTPViewProvider
      totpIssuer={totpIssuer}
      totpSecretCode={totpSecretCode}
      totpUsername={totpUsername}
    >
      <Component {...(props as P)} />
    </TOTPViewProvider>
  );
  TOTPView.displayName = createDisplayName('TOTPView');

  return TOTPView;
}
