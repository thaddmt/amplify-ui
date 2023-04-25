import React from 'react';

import { Form, FormHandle } from '@aws-amplify/ui-react-core-auth';

import { createDisplayName } from '../../ui/utils';

import { DisplayTextProvider } from '../../DisplayText';

import { FieldsProvider } from '../Fields';

import { WithFormView, WithFormViewProps, FormViewProps } from './types';

import { useFields } from '../Fields';
import getDefaultValues from './getDefaultValues';

// @todo should this be merged with a View to create a base FormComponent
function WrappedFormView({ children, ...props }: FormViewProps): JSX.Element {
  const { fields } = useFields();
  const defaultValues = React.useMemo(() => getDefaultValues(fields), [fields]);

  return (
    <Form {...props} defaultValues={defaultValues}>
      {children}
    </Form>
  );
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
    <DisplayTextProvider displayText={displayText}>
      {/* @todo it may be simpler and more straightforward to add this in the 
      authenticator because it will need to handle override fields */}
      <FieldsProvider>
        <WrappedFormView>
          <Component {...(props as ViewProps)} />
        </WrappedFormView>
      </FieldsProvider>
    </DisplayTextProvider>
  );

  const FormView = React.forwardRef(Provider);

  FormView.displayName = createDisplayName('FormView');

  return FormView;
}
