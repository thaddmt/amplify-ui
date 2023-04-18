import React from 'react';
import { createContextUtility } from '@aws-amplify/ui-react-core';
import { PropsType, WithContextProps } from '@aws-amplify/ui-react-core';

import { createDisplayName } from '../../ui/utils';
import { useRoute } from '../Route';

import getDefaultFields from './getDefaultFields';

type FieldsType<Type extends { fields?: unknown }> = Type extends {
  fields?: infer T;
}
  ? T
  : never;

export default function createFieldsViewContext<
  Type extends { fields?: unknown },
  StrictType extends Required<Type> = Required<Type>
>(): {
  useFieldsView: () => StrictType;
  withFieldsView: <
    C extends React.ComponentType<any>,
    P extends PropsType<C>,
    Props extends WithContextProps<Type, P>
  >(
    t: C
  ) => (p: Props) => JSX.Element;
} {
  const [FieldsViewContext, useFieldsView] = createContextUtility<
    Type | null,
    StrictType
  >({
    errorMessage: 'better message here',
    initialValue: null,
  });

  function FieldsViewProvider({
    children,
    fields: _fields,
  }: {
    children?: React.ReactNode;
    fields?: FieldsType<Type>;
  }) {
    const { route } = useRoute();

    const value = React.useMemo(
      () => ({ fields: getDefaultFields({ route }) }),
      [route]
    );

    return (
      <FieldsViewContext.Provider value={value as Type}>
        {children}
      </FieldsViewContext.Provider>
    );
  }

  function withFieldsView<
    C extends React.ComponentType<any>,
    P extends PropsType<C>,
    Props extends WithContextProps<Type, P>
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

  return { useFieldsView, withFieldsView };
}
