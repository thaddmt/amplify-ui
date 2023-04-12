import React from 'react';

import { Flex, useAuthenticator } from '@aws-amplify/ui-react';
import { createProviderView } from '@aws-amplify/ui-react-core';

import { createDisplayName } from '../utils';

import TOTPQRCodeImage from './TOTPQRCodeImage';
import TOTPCopyButton from './TOTPCopyButton';
import { TOTPViewContext } from './ViewContext';
import { FlexProps, TOTPViewContextType } from './types';

const DEFAULT_TOTP_ISSUER = 'AWSCognito';

const DefaultView = ({
  alignItems = 'center',
  children,
  direction = 'column',
  ...props
}: FlexProps) => (
  <Flex alignItems={alignItems} direction={direction} {...props}>
    {children ? (
      children
    ) : (
      <>
        <TOTPQRCodeImage />
        <TOTPCopyButton />
      </>
    )}
  </Flex>
);

const TOTPProvider = ({
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

const getTOTPProviderProps = ({
  totpIssuer,
  totpSecretCode,
  totpUsername,
  ...viewProps
}: FlexProps & TOTPViewContextType) => ({
  providerProps: { totpIssuer, totpSecretCode, totpUsername },
  viewProps,
});

const TOTPView = createProviderView({
  displayName: createDisplayName('TOTPView'),
  Provider: TOTPProvider,
  View: DefaultView,
  // @todo providerPropNames: BothProps[];
  resolveProps: getTOTPProviderProps,
});

export default TOTPView;
