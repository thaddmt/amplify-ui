import React from 'react';

import { getTotpCodeURL, isFunction } from '@aws-amplify/ui';
import { useTimeout } from '@aws-amplify/ui-react-core';
import { Flex, Loader, Text } from '@aws-amplify/ui-react';
import { IconCopy } from '@aws-amplify/ui-react/internal';

import { useQRCodeDataUrl } from '../../../hooks';
import { createDisplayName } from '../utils/index';
import { TOTPViewComponent } from './types';

const RESET_TOOTIP_TEXT_DELAY = 3000;

const TOTPView: TOTPViewComponent = ({
  copyTooltipText,
  totpSecretCode,
  totpIssuer,
  totpUsername,
}): JSX.Element => {
  const [hasCopied, setHasCopied] = React.useState(false);

  const { dataUrl } = useQRCodeDataUrl({
    input: getTotpCodeURL(totpIssuer, totpUsername, totpSecretCode),
  });

  const delay = hasCopied ? RESET_TOOTIP_TEXT_DELAY : undefined;
  useTimeout(() => setHasCopied(false), delay);

  const handleClick = () => {
    navigator.clipboard.writeText(totpSecretCode);
    setHasCopied(true);
  };

  const toolTipText = isFunction(copyTooltipText)
    ? copyTooltipText(hasCopied)
    : copyTooltipText;

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
      <Flex data-amplify-copy>
        <Text as="span">{totpSecretCode}</Text>
        <Flex data-amplify-copy-svg onClick={handleClick}>
          <div data-amplify-copy-tooltip style={{ width: '60px' }}>
            {toolTipText}
          </div>
          <IconCopy />
        </Flex>
      </Flex>
    </Flex>
  );
};

TOTPView.displayName = createDisplayName('TOTPView');

export default TOTPView;
