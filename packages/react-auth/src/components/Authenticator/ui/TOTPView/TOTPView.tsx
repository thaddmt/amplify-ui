import React from 'react';

import { getTotpCodeURL } from '@aws-amplify/ui';
import { Flex, Loader } from '@aws-amplify/ui-react';

import { useQRCodeDataUrl } from '../../../../hooks';

import { createDisplayName } from '../utils';
import { TOTPViewComponent } from './types';

const TOTPView: TOTPViewComponent = ({
  alignItems = 'center',
  children,
  direction = 'column',
  totpSecretCode,
  totpIssuer,
  totpUsername,
  ...props
}) => {
  // if `false`, prevent QR code url geenration and return `null`
  const hasRequiredParams = totpIssuer && totpUsername && totpSecretCode;

  const input = hasRequiredParams
    ? getTotpCodeURL(totpIssuer, totpUsername, totpSecretCode)
    : undefined;

  const { dataUrl, isLoading } = useQRCodeDataUrl({ input });

  if (!hasRequiredParams) {
    return null;
  }

  return (
    <Flex alignItems={alignItems} direction={direction} {...props}>
      {isLoading ? (
        <Loader size="large" />
      ) : (
        <img
          data-amplify-qrcode
          src={dataUrl}
          alt="qr code"
          width="228"
          height="228"
        />
      )}
      {children}
    </Flex>
  );
};

TOTPView.displayName = createDisplayName('TOTPView');

export default TOTPView;
