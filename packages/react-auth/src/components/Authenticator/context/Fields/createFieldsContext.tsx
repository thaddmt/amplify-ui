import React from 'react';
import { createContextUtility } from '@aws-amplify/ui-react-core';
import { WithContextProps } from '@aws-amplify/ui-react-core';

import { createDisplayName } from '../../ui/utils';
import { useRoute } from '../../hooks';

import getDefaultFields from './getDefaultFields';

type FieldsType<Type extends { fields?: unknown }> = Type extends {
  fields?: infer T;
}
  ? T
  : never;

export default function createFieldsContext<T extends { fields?: unknown }>(): {
  FieldsProvider: (props: { children?: React.ReactNode }) => JSX.Element;
  useFields: () => T;
  withFields: <
    C extends React.ComponentType<any>,
    P extends React.ComponentProps<C>,
    CP extends WithContextProps<T, P>
  >(
    Component: C
  ) => (props: CP) => JSX.Element;
} {
  const [FieldsContext, useFields] = createContextUtility<
    T | null,
    Required<T>
  >({
    errorMessage: 'better message here',
    initialValue: null,
  });

  function FieldsProvider({
    children,
    fields: _fields,
  }: {
    children?: React.ReactNode;
    fields?: FieldsType<T>[];
  }) {
    const { route } = useRoute();
    // const { route } = useAuthenticator();

    const value = React.useMemo(
      () => ({ fields: getDefaultFields({ route }) }),
      [route]
    );

    return (
      <FieldsContext.Provider value={value as T}>
        {children}
      </FieldsContext.Provider>
    );
  }

  function withFields<
    C extends React.ComponentType<any>,
    P extends React.ComponentProps<C>,
    Props extends WithContextProps<T, P>
  >(Component: C) {
    function Fields({ fields, ...props }: Props) {
      return (
        <FieldsProvider fields={fields}>
          <Component {...(props as P)} />
        </FieldsProvider>
      );
    }

    Fields.displayName = createDisplayName('Fields');

    return Fields;
  }

  return { FieldsProvider, useFields, withFields };
}
