import React from 'react';

import { getTotpCodeURL } from '@aws-amplify/ui';
import { useTimeout } from '@aws-amplify/ui-react-core';
import { Flex, Loader } from '@aws-amplify/ui-react';

import { useQRCodeDataUrl } from '../../../../hooks';

import { createDisplayName } from '../utils';
import { TOTPViewComponent } from './types';

const RESET_TOOTIP_TEXT_DELAY = 3000;

const TOTPView: TOTPViewComponent = ({
  children,
  totpSecretCode,
  totpIssuer,
  totpUsername,
}): JSX.Element => {
  const [hasCopied, setHasCopied] = React.useState(false);

  const { dataUrl } = useQRCodeDataUrl({
    input: getTotpCodeURL(totpIssuer, totpUsername, totpSecretCode),
  });

  // assigning `undefined` as the value of `delay` prevents `useTimeout`
  // from running the callback
  const delay = hasCopied ? RESET_TOOTIP_TEXT_DELAY : undefined;
  useTimeout(() => setHasCopied(false), delay);

  return (
    <Flex alignItems="center" direction="column">
      {!dataUrl ? (
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
