import * as React from 'react';

import { NavigableRoute, NavigationRoute } from '@aws-amplify/ui';
import { useFormContext } from 'react-hook-form';

import { useDisplayText, useFields } from '../../context';

import { useRoute, useLinks } from '../../hooks';

import { createDisplayName } from '../utils';

import LinkButton from './LinkButton';

const isNavigationRoute = (route: string): route is NavigationRoute =>
  ['resetPassword', 'setupTOTP', 'signIn', 'signUp'].includes(route);

const LinkButtons = (): JSX.Element | null => {
  const { getResetPasswordLinkText, getSignInLinkText, getSignUpLinkText } =
    useDisplayText();
  const { route } = useRoute();
  const { links, setNavigableRoute } = useLinks();
  const { defaultValues } = useFields();
  const { reset } = useFormContext();

  if (!links?.length) {
    return null;
  }

  const getButtonText = (routeLink: NavigableRoute) => {
    if (!isNavigationRoute(route)) {
      return null;
    }
    switch (routeLink) {
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
  };

  return (
    <>
      {links?.map((link) => (
        <LinkButton
          onClick={() => {
            reset(defaultValues);
            setNavigableRoute(link);
          }}
          key={link}
        >
          {getButtonText(link)}
        </LinkButton>
      ))}
    </>
  );
};

LinkButtons.displayName = createDisplayName('LinkButtons');

export default LinkButtons;
