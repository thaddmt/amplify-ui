import React from 'react';

import { Flex, useAuthenticator } from '@aws-amplify/ui-react';

import { createDisplayName } from '../utils';

import TOTPQRCodeImage from './TOTPQRCodeImage';
import TOTPCopyButton from './TOTPCopyButton';
import { TOTPViewComponent } from './types';
import { TOTPViewContext } from './ViewContext';

const DEFAULT_TOTP_ISSUER = 'AWSCognito';

const TOTPView: TOTPViewComponent = ({
  alignItems = 'center',
  copyButtonText,
  children,
  direction = 'column',
  totpIssuer: overrideTOTPIssuer,
  totpSecretCode: overrideTotpSecretCode,
  totpUsername: overrideTotpUsername,
  ...props
}) => {
  const { totpSecretCode: defaultTotpSecretCode, user } = useAuthenticator(
    ({ totpSecretCode, user }) => [totpSecretCode, user]
  );

  const totpIssuer = overrideTOTPIssuer ?? DEFAULT_TOTP_ISSUER;
  const totpSecretCode = overrideTotpSecretCode ?? defaultTotpSecretCode;
  const totpUsername = overrideTotpUsername ?? user?.username;

  const value = React.useMemo(
    () => ({ copyButtonText, totpIssuer, totpUsername, totpSecretCode }),
    [copyButtonText, totpIssuer, totpUsername, totpSecretCode]
  );

  return (
    <TOTPViewContext.Provider value={value}>
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
    </TOTPViewContext.Provider>
  );
};

TOTPView.displayName = createDisplayName('TOTPView');

export default TOTPView;
