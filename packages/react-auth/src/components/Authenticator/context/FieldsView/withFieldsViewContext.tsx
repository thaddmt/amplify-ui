import createFieldsViewContext from './createFieldsView';
import { FieldOptions } from './types';

const { useFieldsView, withFieldsView } =
  createFieldsViewContext<{ fields?: FieldOptions[] }>();

export { useFieldsView, withFieldsView };
