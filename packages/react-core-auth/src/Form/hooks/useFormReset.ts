import { useFormContext } from 'react-hook-form';

import { FieldValues } from '../types';
import { UseFormReset } from './types';

export default function useFormReset<
  Values extends FieldValues
>(): UseFormReset<Values> {
  const { reset } = useFormContext<Values>();
  return { reset };
}
