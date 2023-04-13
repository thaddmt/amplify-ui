import React from 'react';

import { PropsType } from '@aws-amplify/ui-react-core';
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
  C extends React.ComponentType<any>,
  P extends PropsType<C>,
  Props extends WithErrorViewProps<P>
>(Component: C): (props: Props) => JSX.Element {
  const ErrorView = ({ errorMessage, hasError, ...props }: Props) => {
    return (
      <ErrorViewProvider errorMessage={errorMessage} hasError={hasError}>
        <Component {...(props as P)} />
      </ErrorViewProvider>
    );
  };

  ErrorView.displayName = createDisplayName('ErrorView');

  return ErrorView;
}
