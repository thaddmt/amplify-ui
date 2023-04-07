import { AuthenticatorRoute } from '@aws-amplify/ui';

import {
  UseAuthenticator,
  isAuthenticatorComponentRouteKey,
} from '@aws-amplify/ui-react-core-auth';

import { DefaultAuthenticatorDisplayText } from '../../displayText';
import { LinkButtonProps } from './types';

export default function getLinkButtonOptions<Route extends AuthenticatorRoute>({
  displayText,
  route,
  setNavigableRoute,
}: {
  displayText: DefaultAuthenticatorDisplayText;
  route: Route;
  setNavigableRoute: UseAuthenticator['setNavigableRoute'];
}): LinkButtonProps[] | undefined {
  if (!isAuthenticatorComponentRouteKey(route)) {
    return undefined;
  }

  switch (route) {
    case 'resetPassword': {
      const { linkSignInText } = displayText.resetPassword;

      const buttons: LinkButtonProps[] = [
        {
          children: linkSignInText,
          key: 'signIn',
          onClick: () => setNavigableRoute('signIn'),
        },
      ];

      return buttons;
    }
    case 'signIn': {
      const { linkResetPasswordText, linkSignUpText } = displayText.signIn;

      const buttons: LinkButtonProps[] = [
        {
          children: linkResetPasswordText,
          key: 'resetPassword',
          onClick: () => setNavigableRoute('resetPassword'),
        },
        {
          children: linkSignUpText,
          key: 'signUp',
          onClick: () => setNavigableRoute('signUp'),
        },
      ];

      return buttons;
    }
    case 'setupTOTP': {
      const { linkSignInText } = displayText.setupTOTP;
      const buttons: LinkButtonProps[] = [
        {
          children: linkSignInText,
          key: 'signIn',
          onClick: () => setNavigableRoute('signIn'),
        },
      ];

      return buttons;
    }
    case 'signUp': {
      const { linkSignInText } = displayText.signUp;

      const buttons: LinkButtonProps[] = [
        {
          children: linkSignInText,
          key: 'signIn',
          onClick: () => setNavigableRoute('signIn'),
        },
      ];

      return buttons;
    }
    default: {
      return [];
    }
  }
}
