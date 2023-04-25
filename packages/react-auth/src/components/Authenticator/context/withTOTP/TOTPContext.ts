import { createContextUtility } from '@aws-amplify/ui-react-core';

import { TOTPContextType } from './types';

const [TOTPContext, useTOTP] = createContextUtility<TOTPContextType>({
  initialValue: {
    totpIssuer: undefined,
    totpSecretCode: undefined,
    totpUsername: undefined,
  },
});

export { TOTPContext, useTOTP };
