export interface UseSetupTotp {
    copyButtonText: string | undefined;
    handleCopy: () => void;
    qrCodeDataUrl: string | undefined;
    totpCodeUrl: string | undefined;
    totpSecretCode: string | undefined;
}
export declare function useSetupTotp(): UseSetupTotp;
