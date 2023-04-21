import React from 'react';
import { createContextUtility } from '@aws-amplify/ui-react-core';
import { WithContextProps } from '@aws-amplify/ui-react-core';

import { createDisplayName } from '../../ui/utils';
import { useRoute } from '../Route';

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

export default function createFieldsViewContext<
  T extends { fields?: unknown },
  RT extends WithDefaultValues<T> = WithDefaultValues<T>
>(): {
  FieldsViewProvider: (props: { children?: React.ReactNode }) => JSX.Element;
  useFieldsView: () => RT;
  withFieldsView: <
    C extends React.ComponentType<any>,
    P extends React.ComponentProps<C>,
    CP extends WithContextProps<T, P>
  >(
    Component: C
  ) => (props: CP) => JSX.Element;
} {
  const [FieldsViewContext, useFieldsView] = createContextUtility<
    T | null,
    RT & { defaultValues: Record<string, any> }
  >({
    errorMessage: 'better message here',
    initialValue: null,
  });

  function FieldsViewProvider({
    children,
    fields: _fields,
  }: {
    children?: React.ReactNode;
    fields?: FieldsType<RT>;
  }) {
    const { route } = useRoute();

    const value = React.useMemo(() => {
      const fields = getDefaultFields({ route });
      return { defaultValues: getDefaultValues(fields), fields };
    }, [route]);

    return (
      <FieldsViewContext.Provider value={value as RT}>
        {children}
      </FieldsViewContext.Provider>
    );
  }

  function withFieldsView<
    C extends React.ComponentType<any>,
    P extends React.ComponentProps<C>,
    Props extends WithContextProps<T, P>
  >(Component: C) {
    function FieldsView({ fields, ...props }: Props) {
      return (
        <FieldsViewProvider fields={fields}>
          <Component {...(props as P)} />
        </FieldsViewProvider>
      );
    }

    FieldsView.displayName = createDisplayName('FieldsView');

    return FieldsView;
  }

  return { FieldsViewProvider, useFieldsView, withFieldsView };
}
