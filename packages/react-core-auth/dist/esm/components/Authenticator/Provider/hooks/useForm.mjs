import { useForm as useForm$1 } from '@aws-amplify/ui-react-core';
import { useMachine } from '../Machine/MachineContext.mjs';

const ERROR_MESSAGE = '`useForm` must be used inside `Authenticator.Form`';
function useForm() {
    const { handleSubmit: _handleSubmit } = useMachine();
    const { isValid, onSubmit } = useForm$1({
        errorMessage: ERROR_MESSAGE,
        onSubmit: _handleSubmit,
    });
    return { isDisabled: !isValid, onSubmit };
}

export { useForm };
