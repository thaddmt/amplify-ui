import React from 'react';

import { NavigableRoute, NavigationRoute } from '@aws-amplify/ui';
import {
  AuthenticatorRouteComponentKey,
  DefaultValues,
  isAuthenticatorComponentRouteKey,
  useFormReset,
  useDefaultValues,
} from '@aws-amplify/ui-react-core-auth';

import { useDisplayText } from '../../DisplayText';
import { useRoute } from '../useRoute';

import { NAVIGABLE_ROUTES } from './constants';

interface Link {
  handleButtonAction: () => void;
  linkButtonText: string | undefined;
}

export interface UseLinks {
  links: Link[] | undefined;
}

const isNavigationRoute = (
  route: string | undefined
): route is NavigationRoute =>
  !!route && ['resetPassword', 'setupTOTP', 'signIn', 'signUp'].includes(route);

export default function useLinks(): UseLinks {
  const { getResetPasswordLinkText, getSignInLinkText, getSignUpLinkText } =
    useDisplayText();
  const { reset } = useFormReset();
  const { route, setNavigableRoute } = useRoute();
  const { defaultValues } = useDefaultValues();

  const getLinkButtonText = React.useCallback(
    (
      link: NavigableRoute,
      route: AuthenticatorRouteComponentKey | undefined
    ) => {
      if (!isNavigationRoute(route)) {
        return;
      }
      switch (link) {
        case 'resetPassword': {
          return getResetPasswordLinkText(route);
        }
        case 'signIn': {
          return getSignInLinkText(route);
        }
        case 'signUp': {
          return getSignUpLinkText(route);
        }
      }
    },
    [getResetPasswordLinkText, getSignInLinkText, getSignUpLinkText]
  );

  const getHandleButtonAction = React.useCallback(
    (link: NavigableRoute, defaultValues: DefaultValues | undefined) => () => {
      reset(defaultValues);
      setNavigableRoute(link);
    },
    [reset, setNavigableRoute]
  );

  const links = React.useMemo(() => {
    if (!isAuthenticatorComponentRouteKey(route)) {
      return undefined;
    }

    return NAVIGABLE_ROUTES[route]?.map((link) => ({
      linkButtonText: getLinkButtonText(link, route),
      handleButtonAction: getHandleButtonAction(link, defaultValues),
    }));
  }, [defaultValues, getLinkButtonText, getHandleButtonAction, route]);

  return { links: links?.length ? links : undefined };
}
