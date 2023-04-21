import React from 'react';

import { isTypedFunction } from '@aws-amplify/ui';

import { useAuthenticator } from '@aws-amplify/ui-react-core-auth';

import { createDisplayName } from '../../ui/utils';

import { FieldValues, OnSubmit } from '../../Form';

import { SubmitViewContext } from './SubmitViewContext';
import { SubmitViewContextType, WithSubmitViewProps } from './types';

function SubmitViewProvider<T extends FieldValues>({
  children,
  isDisabled: _isDisabled = false,
  onSubmit: _onSubmit,
}: SubmitViewContextType & { children: React.ReactNode }) {
  const { isPending, submitForm } = useAuthenticator(
    ({ isPending, submitForm }) => [isPending, submitForm]
  );

  const isDisabled = _isDisabled || isPending;

  const onSubmit: OnSubmit<T> = React.useCallback(
    (values) => {
      if (isTypedFunction(_onSubmit)) {
        _onSubmit(values);
      }
      submitForm(values);
    },
    [_onSubmit, submitForm]
  );

  const value = React.useMemo(
    () => ({ isDisabled, onSubmit }),
    [isDisabled, onSubmit]
  ) as SubmitViewContextType;

  return (
    <SubmitViewContext.Provider value={value}>
      {children}
    </SubmitViewContext.Provider>
  );
}

export default function withSubmitView<
  C extends React.ComponentType<any>,
  P extends React.ComponentProps<C>,
  Props extends WithSubmitViewProps<P>
>(Component: C): (props: Props) => JSX.Element {
  const SubmitView = ({ isDisabled, onSubmit, ...props }: Props) => (
    <SubmitViewProvider isDisabled={isDisabled} onSubmit={onSubmit}>
      <Component {...(props as P)} />
    </SubmitViewProvider>
  );

  SubmitView.displayName = createDisplayName('SubmitView');

  return SubmitView;
}
