import React from 'react';
import { createContextUtility } from '@aws-amplify/ui-react-core';
import { WithContextProps } from '@aws-amplify/ui-react-core';

import { createDisplayName } from '../../ui/utils';
import { useRoute } from '../../hooks';

import getDefaultFields from './getDefaultFields';
import getDefaultValues from './getDefaultValues';

type FieldsType<Type extends { fields?: unknown }> = Type extends {
  fields?: infer T;
}
  ? T
  : never;

type WithDefaultValues<T> = Required<T> & {
  defaultValues: Record<string, any>;
};

export default function createFieldsContext<
  T extends { fields?: unknown },
  RT extends WithDefaultValues<T> = WithDefaultValues<T>
>(): {
  FieldsProvider: (props: { children?: React.ReactNode }) => JSX.Element;
  useFields: () => RT;
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
    RT & { defaultValues: Record<string, any> }
  >({
    errorMessage: 'better message here',
    initialValue: null,
  });

  function FieldsProvider({
    children,
    fields: _fields,
  }: {
    children?: React.ReactNode;
    fields?: FieldsType<RT>[];
  }) {
    const { route } = useRoute();

    const value = React.useMemo(() => {
      const fields = getDefaultFields({ route });
      return { defaultValues: getDefaultValues(fields), fields };
    }, [route]);

    return (
      <FieldsContext.Provider value={value as RT}>
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
