import { createContextUtility } from '@aws-amplify/ui-react-core';

import { TOTPViewContextType } from './types';

const [TOTPViewContext, useTOTPView] =
  createContextUtility<TOTPViewContextType>({
    initialValue: {
      totpIssuer: undefined,
      totpSecretCode: undefined,
      totpUsername: undefined,
    },
  });

export { TOTPViewContext, useTOTPView };
