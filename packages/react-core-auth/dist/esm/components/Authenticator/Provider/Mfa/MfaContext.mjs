import { createContextUtilities } from '@aws-amplify/ui-react-core';

const { MfaProvider, useMfa } = createContextUtilities({
    contextName: 'Mfa',
    errorMessage: '`useMfa` must be called inside a `MfaProvider`',
});

export { MfaProvider, useMfa };
