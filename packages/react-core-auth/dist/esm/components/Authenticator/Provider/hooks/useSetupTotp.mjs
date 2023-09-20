import { getTotpCodeURL } from '@aws-amplify/ui';
import { useHandleCopy } from '../../../../hooks/useHandleCopy/useHandleCopy.mjs';
import 'react';
import '@aws-amplify/core';
import useQRCodeDataUrl from '../../../../hooks/useQRCodeDataUrl/useQRCodeDataUrl.mjs';
import { useDisplayText } from '../DisplayText/DisplayTextContext.mjs';
import '../ComponentRoute/ComponentRouteContext.mjs';
import { useMachine } from '../Machine/MachineContext.mjs';
import { useMfa } from '../Mfa/MfaContext.mjs';

const COPY_RESET = 2000;
function useSetupTotp() {
    const { totpSecretCode, username } = useMachine();
    const { getCopyButtonText } = useDisplayText();
    const { totpIssuer, totpUsername: _totpUsername } = useMfa();
    const { handleCopy, value } = useHandleCopy({
        target: totpSecretCode,
        reset: COPY_RESET,
    });
    const hasCopied = !!value;
    const copyButtonText = getCopyButtonText(hasCopied);
    // prefer `_totpUsername` override from `MfaProvider` props
    const totpUsername = _totpUsername !== null && _totpUsername !== void 0 ? _totpUsername : username;
    // prevent QR code url generation if `false`
    const hasRequiredInputParams = totpIssuer && totpSecretCode && totpUsername;
    const totpCodeUrl = hasRequiredInputParams
        ? getTotpCodeURL(totpIssuer, totpUsername, totpSecretCode)
        : undefined;
    const { dataUrl } = useQRCodeDataUrl({ input: totpCodeUrl });
    return {
        copyButtonText,
        handleCopy,
        totpCodeUrl,
        totpSecretCode,
        qrCodeDataUrl: dataUrl,
    };
}

export { useSetupTotp };
