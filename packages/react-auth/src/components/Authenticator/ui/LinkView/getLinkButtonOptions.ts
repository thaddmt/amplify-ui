import { AuthenticatorRoute } from '@aws-amplify/ui';

import {
  UseAuthenticator,
  isAuthenticatorComponentRouteKey,
} from '@aws-amplify/ui-react-core-auth';

import { DefaultAuthenticatorDisplayText } from '../../displayText';
import { LinkButtonProps } from './types';

type LinkButtonDisplayText = Pick<
  DefaultAuthenticatorDisplayText,
  'getResetPasswordLinkText' | 'getSignInLinkText' | 'getSignUpLinkText'
>;

export default function getLinkButtonOptions<Route extends AuthenticatorRoute>({
  linkButtonDisplayText,
  route,
  setNavigableRoute,
}: {
  linkButtonDisplayText: LinkButtonDisplayText;
  route: Route;
  setNavigableRoute: UseAuthenticator['setNavigableRoute'];
}): LinkButtonProps[] | undefined {
  if (!isAuthenticatorComponentRouteKey(route)) {
    return undefined;
  }

  const { getResetPasswordLinkText, getSignInLinkText, getSignUpLinkText } =
    linkButtonDisplayText;

  switch (route) {
    case 'resetPassword': {
      const buttons: LinkButtonProps[] = [
        {
          children: getSignInLinkText(route),
          key: 'signIn',
          onClick: () => setNavigableRoute('signIn'),
        },
      ];

      return buttons;
    }
    case 'signIn': {
      const buttons: LinkButtonProps[] = [
        {
          children: getResetPasswordLinkText(route),
          key: 'resetPassword',
          onClick: () => setNavigableRoute('resetPassword'),
        },
        {
          children: getSignUpLinkText(route),
          key: 'signUp',
          onClick: () => setNavigableRoute('signUp'),
        },
      ];

      return buttons;
    }
    case 'setupTOTP': {
      const buttons: LinkButtonProps[] = [
        {
          children: getSignInLinkText(route),
          key: 'signIn',
          onClick: () => setNavigableRoute('signIn'),
        },
      ];

      return buttons;
    }
    case 'signUp': {
      const buttons: LinkButtonProps[] = [
        {
          children: getSignInLinkText(route),
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
