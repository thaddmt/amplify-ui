import React from 'react';

import { composeProviderView } from '@aws-amplify/ui-react-core';
import {
  DefaultViewComponent,
  useAuthenticator,
} from '@aws-amplify/ui-react-core-auth';

import { createDisplayName } from '../../ui/utils';

import { TOTPViewContext } from './TOTPViewContext';
import { TOTPViewContextType } from './types';

const DEFAULT_TOTP_ISSUER = 'AWSCognito';

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

function resolveProps<ViewProps>({
  totpIssuer,
  totpSecretCode,
  totpUsername,
  ...rest
}: ViewProps & TOTPViewContextType): {
  providerProps: TOTPViewContextType;
  viewProps: ViewProps;
} {
  return {
    providerProps: { totpIssuer, totpSecretCode, totpUsername },
    // @todo fix me?
    viewProps: rest as ViewProps,
  };
}

export default function createTOTPView<
  ViewProps extends { children?: React.ReactNode }
>(
  View: DefaultViewComponent<ViewProps>
): React.ComponentType<ViewProps & TOTPViewContextType> {
  return composeProviderView({
    displayName: createDisplayName('TOTPView'),
    Provider: TOTPProvider,
    resolveProps,
    View,
  });
}
