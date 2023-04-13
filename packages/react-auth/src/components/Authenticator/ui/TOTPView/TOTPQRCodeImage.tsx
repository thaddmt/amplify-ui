import React from 'react';
import { Image, Loader as DefaultLoader } from '@aws-amplify/ui-react';
import { getTotpCodeURL } from '@aws-amplify/ui';

import { useQRCodeDataUrl } from '../../../../hooks';

import { createDisplayName } from '../utils';
import { useTOTPView } from '../../context';
import { LoaderComponent, QRCodeImageComponent } from './types';

const DefaultLoaderComponent: LoaderComponent = ({
  children,
  size = 'large',
  ...props
}) => (
  <DefaultLoader {...props} size={size}>
    {children}
  </DefaultLoader>
);

const QRCodeImage: QRCodeImageComponent = ({
  alt = 'qr code',
  children,
  Loader = DefaultLoaderComponent,
  height = '228',
  width = '228',
  ...props
}) => {
  const { totpIssuer, totpSecretCode, totpUsername } = useTOTPView();

  // prevent QR code url generation if `false`
  const hasRequiredParams = totpIssuer && totpSecretCode && totpUsername;

  const input = hasRequiredParams
    ? getTotpCodeURL(totpIssuer, totpUsername, totpSecretCode)
    : undefined;

  const { dataUrl, isLoading } = useQRCodeDataUrl({ input });

  if (!hasRequiredParams) {
    return null;
  }

  return isLoading ? (
    <Loader />
  ) : (
    <Image
      {...props}
      data-amplify-qrcode
      src={dataUrl}
      alt={alt}
      width={width}
      height={height}
    >
      {children}
    </Image>
  );
};

QRCodeImage.displayName = createDisplayName('QRCodeImage');

export default QRCodeImage;
