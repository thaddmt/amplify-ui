import { useComponentRoute, isRoute } from '../ComponentRoute/ComponentRouteContext.mjs';
import { useDisplayText } from '../DisplayText/DisplayTextContext.mjs';
import '@aws-amplify/ui';
import { useMachine } from '../Machine/MachineContext.mjs';
import { useForm } from './useForm.mjs';

function useActions() {
    const { resendConfirmationCode, skipAttributeVerification } = useMachine();
    const { getPrimaryButtonText, getSecondaryButtonText } = useDisplayText();
    const { route } = useComponentRoute();
    const hasSkipAction = isRoute(route, 'confirmVerifyUser', 'verifyUser');
    const hasResendAction = isRoute(route, 'confirmResetPassword', 'confirmSignUp');
    const hasSecondaryButton = hasSkipAction || hasResendAction;
    const secondaryButtonAction = hasResendAction
        ? resendConfirmationCode
        : hasSkipAction
            ? skipAttributeVerification
            : undefined;
    const { isDisabled: isPrimaryButtonDisabled, onSubmit } = useForm();
    return {
        isPrimaryButtonDisabled,
        primaryButtonText: getPrimaryButtonText(route),
        primaryButtonAction: onSubmit,
        secondaryButtonAction,
        secondaryButtonText: hasSecondaryButton
            ? getSecondaryButtonText(route)
            : undefined,
    };
}

export { useActions };
