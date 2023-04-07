import * as React from 'react';

import { AuthenticatorMachineOptions } from '@aws-amplify/ui';
import { AuthenticatorRouteComponentKey } from '@aws-amplify/ui-react-core-auth';

import { AuthenticatorDisplayText } from './displayText';
import {
  ContainerViewComponent,
  FieldOptions,
  FormComponent,
  SubmitButtonComponent,
  ErrorViewComponent,
  LinkViewComponent,
  FederatedProviderViewComponent,
  TOTPViewComponent,
} from './ui';

type Fields = Partial<
  Record<
    AuthenticatorRouteComponentKey,
    FieldOptions[] | ((fields: FieldOptions[]) => FieldOptions[])
  >
>;

export type AuthenticatorProps = Partial<AuthenticatorMachineOptions> & {
  children?: React.ReactNode;

  displayText?: AuthenticatorDisplayText;
  fields?: Fields;

  ContainerView?: ContainerViewComponent;
  Form?: FormComponent;
  ErrorView?: ErrorViewComponent;
  LinkView?: LinkViewComponent;
  SubmitButton?: SubmitButtonComponent;
  FederatedProviderView?: FederatedProviderViewComponent;
  TOTPView?: TOTPViewComponent;

  variation?: 'default' | 'modal';
};
