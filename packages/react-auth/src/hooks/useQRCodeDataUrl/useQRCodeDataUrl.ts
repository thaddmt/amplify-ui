import React from 'react';
import QRCode from 'qrcode';

type UseAsyncHookParams<Params> = Params & {
  onError?: (err: string) => void;
};

type UseAsyncHook<Return> = Return & {
  hasError: boolean;
  isLoading: boolean;
};

type UseQRCodeUrlParams = UseAsyncHookParams<{ input: string }>;

type UseQRCodeUrl = UseAsyncHook<{
  dataUrl: string | null;
}>;

const INITIAL_OUTPUT: UseQRCodeUrl = {
  dataUrl: null,
  hasError: false,
  isLoading: true,
};

/**
 * Generates a QR code data url.
 *
 * @param {UseQRCodeUrlParams} params input and event callbacks
 * @returns {UseQRCodeUrl} data url related values
 */
export default function useQRCodeDataUrl({
  input,
  onError,
}: UseQRCodeUrlParams): UseQRCodeUrl {
  const [output, setOutput] = React.useState<UseQRCodeUrl>(
    () => INITIAL_OUTPUT
  );

  React.useEffect(() => {
    if (!input || output.dataUrl) {
      return;
    }

    const isLoading = false;
    try {
      QRCode.toDataURL(input).then((dataUrl) => {
        setOutput((prev) => ({ ...prev, dataUrl, isLoading }));
      });
    } catch (error) {
      if (typeof onError === 'function') {
        onError((error as Error).message);
      }
      setOutput((prev) => ({ ...prev, hasError: true, isLoading }));
    }
  }, [input, onError, output.dataUrl]);

  return output;
}
