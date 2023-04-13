import React from 'react';

import { Alert } from '@aws-amplify/ui-react';

import { useErrorView } from '../../context';
import { ErrorAlertProps } from './types';

import { createDisplayName } from '../utils';

const ErrorAlert = ({
  children,
  variation = 'error',
  ...props
}: ErrorAlertProps): JSX.Element | null => {
  const { errorMessage, hasError } = useErrorView();

  if (!children && !hasError) {
    return null;
  }

  return (
    <Alert {...props} variation={variation}>
      {children ? children : errorMessage}
    </Alert>
  );
};

ErrorAlert.displayName = createDisplayName('ErrorAlert');

export default ErrorAlert;
