import React from 'react';

import { useRoute } from '../Route';

import { createDisplayName } from '../../ui/utils';
import {
  isAuthenticatorComponentRouteKey,
  useAuthenticator,
} from '@aws-amplify/ui-react-core-auth';

import { NAVIGABLE_ROUTES } from './constants';
import { LinksViewContext } from './LinksViewContext';
import { LinksViewContextType, withLinkViewProps } from './types';

const LinksViewProvider = ({
  children,
  links: overrideLinks,
  setNavigableRoute: overrideSetNavigableRoute,
}: LinksViewContextType & { children?: React.ReactNode }) => {
  const { setNavigableRoute: defaultSetNavigableRoute } = useAuthenticator();
  const { route } = useRoute();

  const links = React.useMemo(() => {
    if (Array.isArray(overrideLinks)) {
      return overrideLinks;
    }
    return isAuthenticatorComponentRouteKey(route)
      ? NAVIGABLE_ROUTES[route]
      : undefined;
  }, [overrideLinks, route]);

  const setNavigableRoute =
    overrideSetNavigableRoute ?? defaultSetNavigableRoute;

  const value = React.useMemo(
    () => ({ links, setNavigableRoute }),
    [links, setNavigableRoute]
  );

  return (
    <LinksViewContext.Provider value={value}>
      {children}
    </LinksViewContext.Provider>
  );
};

export default function withLinkView<
  C extends React.ComponentType<any>,
  P extends React.ComponentProps<C>,
  Props extends withLinkViewProps<P>
>(Component: C): (props: Props) => JSX.Element {
  const LinksView = ({ links, ...props }: Props) => (
    <LinksViewProvider links={links}>
      <Component {...(props as P)} />
    </LinksViewProvider>
  );

  LinksView.displayName = createDisplayName('LinksView');

  return LinksView;
}
