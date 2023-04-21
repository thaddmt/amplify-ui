export default function getDefaultValues<T extends Record<'name', string>>(
  fields: T[]
): Record<string, string> {
  return fields.reduce((prev, { name }) => ({ ...prev, [name]: '' }), {});
}
