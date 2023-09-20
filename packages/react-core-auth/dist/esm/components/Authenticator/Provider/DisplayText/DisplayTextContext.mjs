import { createContextUtilities } from '@aws-amplify/ui-react-core';

const { DisplayTextContext, DisplayTextProvider, useDisplayText } = createContextUtilities({
    errorMessage: '`useDisplayText` must be called inside a `DisplayTextProvider`',
    contextName: 'DisplayText',
});

export { DisplayTextContext, DisplayTextProvider, useDisplayText };
