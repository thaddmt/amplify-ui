import createFieldsViewContext from './createFieldsView';
import { FieldOptions } from './types';

const { FieldsViewProvider, useFieldsView, withFieldsView } =
  createFieldsViewContext<{ fields?: FieldOptions[] }>();

export { FieldsViewProvider, useFieldsView, withFieldsView };
