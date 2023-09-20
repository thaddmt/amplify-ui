interface UseQRCodeUrlParams {
    input: string | undefined;
    onError?: (err: string) => void;
    onSuccess?: (dataUrl: string) => void;
}
interface UseQRCodeUrl {
    dataUrl: string | undefined;
    hasError: boolean;
    isLoading: boolean;
}
/**
 * Generates a QR code data url.
 *
 * @param {UseQRCodeUrlParams} params input and event callbacks
 * @returns {UseQRCodeUrl} data url related values
 */
export default function useQRCodeDataUrl({ input, onError, onSuccess, }: UseQRCodeUrlParams): UseQRCodeUrl;
export {};
