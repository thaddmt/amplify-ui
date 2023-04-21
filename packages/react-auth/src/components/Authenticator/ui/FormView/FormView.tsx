import React from 'react';

import { Prettify } from '@aws-amplify/ui';
import { Flex } from '@aws-amplify/ui-react';

import { FieldValues, OnSubmit } from '../../Form';
import { useFormView } from '../../context';

import { createDisplayName } from '../utils';

type FormViewProps<T extends FieldValues = FieldValues> = Prettify<
  Omit<Parameters<typeof Flex>[0], 'as'> & { onSubmit?: OnSubmit<T> }
>;

const FormView = ({
  children,
  // @todo move style to classes
  direction = 'column',
}: FormViewProps): JSX.Element => {
  const { handleSubmit, onSubmit: _onSubmit } = useFormView();

  const onSubmit = React.useMemo(
    () => handleSubmit(_onSubmit),
    [handleSubmit, _onSubmit]
  );

  return (
    <Flex
      as="form"
      direction={direction}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={onSubmit}
      // onReset={onReset}
    >
      {children}
    </Flex>
  );
};

// const FormView = ({
//   children,
//   // @todo move style to classes
//   direction = 'column',
//   onSubmit,
// }: FormViewProps): JSX.Element => {
//   const { handleSubmit: _handleSubmit } = useFormView();

//   const handleSubmit = React.useMemo(
//     () =>
//       _handleSubmit((e) => {
//         if (isTypedFunction(onSubmit)) {
//           onSubmit(e);
//         }
//       }),
//     [_handleSubmit, onSubmit]
//   );

//   return (
//     <Flex
//       as="form"
//       direction={direction}
//       // eslint-disable-next-line @typescript-eslint/no-misused-promises
//       onSubmit={handleSubmit}
//     >
//       {children}
//     </Flex>
//   );
// };

FormView.displayName = createDisplayName('FormView');

export default FormView;
