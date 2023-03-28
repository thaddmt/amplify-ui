import React from 'react';

import { Button, Flex } from '@aws-amplify/ui-react';

import { default as Form, FieldControlProps, FormProps } from './Form';
import { default as Field, FieldOptions } from './Field';
import { AuthenticatorRoute } from '@aws-amplify/ui';

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
  route: AuthenticatorRoute;
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
  const formRef = React.useRef<React.ElementRef<typeof Form>>(null);

  // clear `Form` on initial mount
  React.useEffect(() => {
    formRef.current?.reset();
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
              <Form.FieldControl
                key={field.name}
                type={field.type}
                validate={validate}
              >
                <Field {...field} />
              </Form.FieldControl>
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
