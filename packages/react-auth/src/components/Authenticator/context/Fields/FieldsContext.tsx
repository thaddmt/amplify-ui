import createFieldsContext from './createFieldsContext';
import { FieldOptions } from './types';

const { FieldsProvider, useFields } =
  createFieldsContext<{ fields?: FieldOptions[] }>();

export { FieldsProvider, useFields };
