import React from 'react';

import { createDisplayName } from '../../ui/utils';
import { Form, FormHandle } from '../../Form';
import { DisplayTextProvider } from '../DisplayText';
import { RouteProvider } from '../Route';
import { FieldsViewProvider } from '../FieldsView';

import { WithFormView, WithFormViewProps, FormViewProps } from './types';

import { useFieldsView } from '../FieldsView';

function WrappedFormView({ children }: FormViewProps): JSX.Element {
  const { defaultValues } = useFieldsView();

  return <Form defaultValues={defaultValues}>{children}</Form>;
}

export default function withFormView<
  View extends React.ComponentType<any>,
  ViewProps extends React.ComponentProps<View>,
  FormViewProps extends WithFormViewProps<ViewProps>
>(Component: View): WithFormView<FormViewProps> {
  const Provider = (
    { displayText, ...props }: FormViewProps,
    _ref: React.ForwardedRef<FormHandle>
  ) => (
    <RouteProvider>
      <FieldsViewProvider>
        <WrappedFormView>
          <DisplayTextProvider displayText={displayText}>
            <Component {...(props as ViewProps)} />
          </DisplayTextProvider>
        </WrappedFormView>
      </FieldsViewProvider>
    </RouteProvider>
  );

  const FormView = React.forwardRef(Provider);

  FormView.displayName = createDisplayName('FormView');

  return FormView;
}
