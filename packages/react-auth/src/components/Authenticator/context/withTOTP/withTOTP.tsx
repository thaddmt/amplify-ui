import React from 'react';

import { useAuthenticator } from '@aws-amplify/ui-react-core-auth';

import { createDisplayName } from '../../ui/utils';

import { TOTPContext } from './TOTPContext';
import { TOTPContextType, WithTOTPProps } from './types';

const DEFAULT_TOTP_ISSUER = 'AWSCognito';

export const TOTPProvider = ({
  children,
  totpIssuer: overrideTOTPIssuer,
  totpSecretCode: overrideTotpSecretCode,
  totpUsername: overrideTotpUsername,
}: TOTPContextType & { children?: React.ReactNode }): JSX.Element => {
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

  return <TOTPContext.Provider value={value}>{children}</TOTPContext.Provider>;
};

export function withTOTP<
  C extends React.ComponentType<any>,
  P extends React.ComponentProps<C>,
  Props extends WithTOTPProps<P>
>(Component: C): (props: Props) => JSX.Element {
  const TOTPView = ({
    totpIssuer,
    totpSecretCode,
    totpUsername,
    ...props
  }: Props) => (
    <TOTPProvider
      totpIssuer={totpIssuer}
      totpSecretCode={totpSecretCode}
      totpUsername={totpUsername}
    >
      <Component {...(props as P)} />
    </TOTPProvider>
  );

  TOTPView.displayName = createDisplayName('TOTPView');

  return TOTPView;
}
