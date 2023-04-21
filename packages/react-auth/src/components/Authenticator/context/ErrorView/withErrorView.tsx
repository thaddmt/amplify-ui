import React from 'react';

import { useAuthenticator } from '@aws-amplify/ui-react-core-auth';

import { createDisplayName } from '../../ui/utils';

import { ErrorViewContext } from './ErrorViewContext';
import { ErrorViewContextType, WithErrorViewProps } from './types';

const ErrorViewProvider = ({
  children,
  errorMessage: overrideErrorMessage,
  hasError: overrideHasError,
}: ErrorViewContextType & { children?: React.ReactNode }): JSX.Element => {
  const { error: defaultErrorMessage } = useAuthenticator(({ error }) => [
    error,
  ]);

  const errorMessage = overrideErrorMessage ?? defaultErrorMessage;
  const hasError = overrideHasError ?? !!errorMessage;

  const value = React.useMemo(
    () => ({ errorMessage, hasError }),
    [errorMessage, hasError]
  );

  return (
    <ErrorViewContext.Provider value={value}>
      {children}
    </ErrorViewContext.Provider>
  );
};

export default function withErrorView<
  View extends React.ComponentType<any>,
  ViewProps extends React.ComponentProps<View>,
  ErrorViewProps extends WithErrorViewProps<ViewProps>
>(Component: View): (props: ErrorViewProps) => JSX.Element {
  const ErrorView = ({ errorMessage, hasError, ...props }: ErrorViewProps) => {
    return (
      <ErrorViewProvider errorMessage={errorMessage} hasError={hasError}>
        <Component {...(props as ViewProps)} />
      </ErrorViewProvider>
    );
  };

  ErrorView.displayName = createDisplayName('ErrorView');

  return ErrorView;
}
