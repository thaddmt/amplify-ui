import * as React from 'react';

import { AuthenticatorMachineOptions } from '@aws-amplify/ui';
import { AuthenticatorRouteComponentKey } from '@aws-amplify/ui-react-core-auth';

import { AuthenticatorDisplayText } from './context';
import {
  FieldOptions,
  FormComponent,
  SubmitButtonComponent,
  // ErrorViewComponent,
  // LinkViewComponent,
  // FederatedProviderViewComponent,
  // TOTPViewComponent,
} from './ui';

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

export type AuthenticatorProps = Partial<AuthenticatorMachineOptions> & {
  children?: React.ReactNode;
  displayText?: AuthenticatorDisplayText;
  fields?: Fields;

  Form?: FormComponent;
  SubmitButton?: SubmitButtonComponent;

  ContainerView?: DefaultViewComponent;
  ErrorView?: DefaultViewComponent;
  LinkView?: DefaultViewComponent;
  FederatedProviderView?: DefaultViewComponent;
  TOTPView?: DefaultViewComponent;

  variation?: 'default' | 'modal';
};
