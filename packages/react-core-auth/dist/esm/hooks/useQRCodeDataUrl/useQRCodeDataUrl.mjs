import React from 'react';
import QRCode from 'qrcode';
import { isFunction } from '@aws-amplify/ui';

const INITIAL_OUTPUT = {
    dataUrl: undefined,
    hasError: false,
    isLoading: true,
};
/**
 * Generates a QR code data url.
 *
 * @param {UseQRCodeUrlParams} params input and event callbacks
 * @returns {UseQRCodeUrl} data url related values
 */
function useQRCodeDataUrl({ input, onError, onSuccess, }) {
    const [output, setOutput] = React.useState(() => INITIAL_OUTPUT);
    React.useEffect(() => {
        if (!input || output.dataUrl) {
            return;
        }
        let ignore = false;
        try {
            QRCode.toDataURL(input).then((dataUrl) => {
                if (ignore) {
                    return;
                }
                if (isFunction(onSuccess)) {
                    onSuccess(dataUrl);
                }
                setOutput((prev) => (Object.assign(Object.assign({}, prev), { dataUrl, isLoading: false })));
            });
        }
        catch (error) {
            if (ignore) {
                return;
            }
            if (isFunction(onError)) {
                onError(error.message);
            }
            setOutput((prev) => (Object.assign(Object.assign({}, prev), { hasError: true, isLoading: false })));
        }
        return () => {
            ignore = true;
        };
    }, [input, onError, onSuccess, output.dataUrl]);
    return output;
}

export { useQRCodeDataUrl as default };
