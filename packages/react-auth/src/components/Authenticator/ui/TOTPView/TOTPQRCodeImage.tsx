import React from 'react';
import { Image, Loader as DefaultLoader } from '@aws-amplify/ui-react';
import { getTotpCodeURL } from '@aws-amplify/ui';

import { useQRCodeDataUrl } from '../../../../hooks';

import { createDisplayName } from '../utils';
import { useTOTPViewContext } from './ViewContext';
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
  width = '228',
  height = '228',
  Loader = DefaultLoaderComponent,
  ...props
}) => {
  const { totpIssuer, totpSecretCode, totpUsername } = useTOTPViewContext();

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
    />
  );
};

QRCodeImage.displayName = createDisplayName('QRCodeImage');

export default QRCodeImage;
