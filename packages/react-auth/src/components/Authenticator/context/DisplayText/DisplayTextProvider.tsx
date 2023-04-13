import { createContextUtility } from '@aws-amplify/ui-react-core';

import { DEFAULT_AUTHENTICATOR_DISPLAY_TEXT } from './displayText';
import {
  AuthenticatorDisplayText,
  DefaultAuthenticatorDisplayText,
} from './types';

// @todo add actual DisplayTextProvider
const [{ Provider: DisplayTextProvider }, useDisplayText] =
  createContextUtility<
    AuthenticatorDisplayText | null,
    DefaultAuthenticatorDisplayText
  >({ initialValue: null });

export { DisplayTextProvider, useDisplayText };
