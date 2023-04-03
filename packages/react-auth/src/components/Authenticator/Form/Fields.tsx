import React from 'react';

import { Flex } from '@aws-amplify/ui-react';

import { default as Form, FieldControlProps } from './Form';
import { default as Field, FieldOptions } from './Field';

interface FieldsProps {
  // only for customer use, @todo remove this comment
  // children?: React.ReactNode;
  fields: (FieldOptions & Omit<FieldControlProps, 'children'>)[];
}

/**
 *
 * Nsxt Steps:
 * - this shoudl take children
 * - add as static prop on Authenticator
 * - add Field static prop on Authenticator
 * - add Field as prop here?
 */

export default function Fields({ fields }: FieldsProps): JSX.Element {
  return (
    <Flex data-amplify-container="" direction="column">
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
    </Flex>
  );
}
