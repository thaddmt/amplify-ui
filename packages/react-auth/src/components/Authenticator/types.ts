import * as React from 'react';

import { AuthenticatorMachineOptions, Prettify } from '@aws-amplify/ui';
import { AuthenticatorRouteComponentKey } from '@aws-amplify/ui-react-core-auth';

import { DisplayText } from './DisplayText';
import { FieldOptions } from './ui';

type Fields = Partial<
  Record<
    AuthenticatorRouteComponentKey,
    FieldOptions[] | ((fields: FieldOptions[]) => FieldOptions[])
  >
>;

type DefaultViewComponent<P = {}> = React.ComponentType<
  { children?: React.ReactNode } & P
>;

// @todo does this make sense to allow a full Authenticator override?
// type Components = Authenticator | { } // route keys: component

export type AuthenticatorProps = Prettify<
  Omit<Partial<AuthenticatorMachineOptions>, 'formFields'> & {
    children?: React.ReactNode;
    displayText?: DisplayText;
    fields?: Fields;

    SubmitButton?: DefaultViewComponent;

    ContainerView?: DefaultViewComponent;
    ErrorView?: DefaultViewComponent;
    LinkView?: DefaultViewComponent;
    FederatedProvidersView?: DefaultViewComponent;
    TOTPView?: DefaultViewComponent;

    variation?: 'default' | 'modal';
  }
>;
