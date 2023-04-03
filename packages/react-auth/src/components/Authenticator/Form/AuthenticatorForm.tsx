import React from 'react';

import { Button, Flex } from '@aws-amplify/ui-react';

import { default as Form, FieldControlProps, FormProps } from './Form';
import { default as Field, FieldOptions } from './Field';

export interface AuthenticatorFormProps {
  // only for customer use, @todo remove this comment
  children?: React.ReactNode;
  fields: (FieldOptions & Omit<FieldControlProps, 'children'>)[];
  Footer: React.ComponentType;
  Header: React.ComponentType;
  // Header: React.ComponentType<{ children: React.ReactNode}>;

  // This way users can pass in their component with a children prop to receive OUR children,
  // and then do like:
  // const MyFooter = ({ c }) => {
  //   <CoolStuffWrapper>
  //     <SomeText />
  //     {c}
  //   </CoolStuffWrapper>
  // }

  isPending: boolean;
  onSubmit: FormProps<Record<string, string>>['onSubmit'];
  // route: AuthenticatorRoute;
  SubmitButton?: SubmitButtonComponent;
  submitButtonText: React.ReactNode;
}

type SubmitButtonComponent = React.ComponentType<{
  isDisabled: boolean;
  children: React.ReactNode;
}>;

const DefaultSubmitButton: SubmitButtonComponent = (props) => (
  <Button {...props} fontWeight="normal" variation="primary" type="submit" />
);

export default function AuthenticatorForm({
  children,
  fields,
  Footer,
  Header,
  isPending,
  onSubmit,
  submitButtonText,
  SubmitButton = DefaultSubmitButton,
}: AuthenticatorFormProps): JSX.Element {
  // @todo ref needs to handle custom form components in
  // case user defines an override that does not have the reset API
  const formRef = React.useRef<React.ElementRef<typeof Form>>(null);

  // @todo clear `Form` on initial mount or unmount
  // @todo prevemt reset on submit events
  React.useEffect(() => {
    // return () => {
    // formRef.current?.reset();
    // };
  });

  return (
    <Form onSubmit={onSubmit} ref={formRef}>
      {/* children always wins, @todo remove this comment */}
      {children ? (
        children
      ) : (
        <Flex data-amplify-container="" direction="column">
          <Header />
          {fields?.map(({ validate, ...field }) => {
            return (
              <Form.FieldControlProvider
                key={field.name}
                name={field.name}
                validate={validate}
              >
                <Field {...field} />
              </Form.FieldControlProvider>
            );
          })}
          <Form.ButtonControl type="submit">
            <SubmitButton isDisabled={isPending}>
              {submitButtonText}
            </SubmitButton>
          </Form.ButtonControl>
          <Footer />
        </Flex>
      )}
    </Form>
  );
}
