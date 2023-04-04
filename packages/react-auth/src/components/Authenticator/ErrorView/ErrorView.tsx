import React from 'react';
import { Prettify } from '@aws-amplify/ui';
import { Alert } from '@aws-amplify/ui-react';

type ErrorViewProps = Prettify<Parameters<typeof Alert>[0]>;

export type ErrorViewComponent<P = {}> = React.ComponentType<
  ErrorViewProps & P
>;

const ErrorView: ErrorViewComponent = ({
  children,
  variation = 'error',
  ...props
}: ErrorViewProps): JSX.Element | null => (
  <Alert {...props} variation={variation}>
    {children}
  </Alert>
);

ErrorView.displayName = 'ErrorView';

export default ErrorView;
