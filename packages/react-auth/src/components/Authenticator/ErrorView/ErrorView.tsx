import React from 'react';
import { Prettify } from '@aws-amplify/ui';
import { Alert } from '@aws-amplify/ui-react';

import { createDisplayName } from '../utils/index';

type ErrorViewProps = Prettify<Parameters<typeof Alert>[0]>;

export type ErrorViewComponent<P = {}> = React.ComponentType<
  ErrorViewProps & P
>;

const ErrorView: ErrorViewComponent = ({
  children,
  variation = 'error',
  ...props
}: ErrorViewProps): JSX.Element | null =>
  !children ? null : (
    <Alert {...props} variation={variation}>
      {children}
    </Alert>
  );

ErrorView.displayName = createDisplayName('ErrorView');

export default ErrorView;
