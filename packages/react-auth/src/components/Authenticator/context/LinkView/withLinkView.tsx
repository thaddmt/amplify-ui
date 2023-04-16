import React from 'react';

import { PropsType } from '@aws-amplify/ui-react-core';

import { useRoute } from '../Route';

import { createDisplayName } from '../../ui/utils';
import { useAuthenticator } from '@aws-amplify/ui-react-core-auth';

import { NAVIGABLE_ROUTES } from './constants';
import { LinkProviderViewContext } from './LinkProviderViewContext';
import { LinkProviderViewContextType, withLinkViewProps } from './types';

const LinkProviderViewProvider = ({
  children,
  links: overrideLinks,
  setNavigableRoute: overrideSetNavigableRoute,
}: LinkProviderViewContextType & { children?: React.ReactNode }) => {
  const { setNavigableRoute: defaultSetNavigableRoute } = useAuthenticator();
  const { route } = useRoute();

  const links = overrideLinks ?? NAVIGABLE_ROUTES[route];
  const setNavigableRoute =
    overrideSetNavigableRoute ?? defaultSetNavigableRoute;

  const value = React.useMemo(
    () => ({ links, setNavigableRoute }),
    [links, setNavigableRoute]
  );

  return (
    <LinkProviderViewContext.Provider value={value}>
      {children}
    </LinkProviderViewContext.Provider>
  );
};

export default function withLinkView<
  C extends React.ComponentType<any>,
  P extends PropsType<C>,
  Props extends withLinkViewProps<P>
>(Component: C): (props: Props) => JSX.Element {
  const LinkProviderView = ({ links, ...props }: Props) => (
    <LinkProviderViewProvider links={links}>
      <Component {...(props as P)} />
    </LinkProviderViewProvider>
  );

  LinkProviderView.displayName = createDisplayName('LinkProviderView');

  return LinkProviderView;
}
