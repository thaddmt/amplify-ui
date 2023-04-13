import * as React from 'react';

import { AuthenticatorMachineOptions } from '@aws-amplify/ui';
import { AuthenticatorRouteComponentKey } from '@aws-amplify/ui-react-core-auth';

import { AuthenticatorDisplayText } from './context';
import {
  FieldOptions,
  FormComponent,
  SubmitButtonComponent,
  ErrorViewComponent,
  LinkViewComponent,
  FederatedProviderViewComponent,
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

export type AuthenticatorProps = Partial<AuthenticatorMachineOptions> & {
  children?: React.ReactNode;

  displayText?: AuthenticatorDisplayText;
  fields?: Fields;

  ContainerView?: DefaultViewComponent;
  Form?: FormComponent;
  ErrorView?: ErrorViewComponent;
  LinkView?: LinkViewComponent;
  SubmitButton?: SubmitButtonComponent;
  FederatedProviderView?: FederatedProviderViewComponent;
  TOTPView?: DefaultViewComponent;

  variation?: 'default' | 'modal';
};
