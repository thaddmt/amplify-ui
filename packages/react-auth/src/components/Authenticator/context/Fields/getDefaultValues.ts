export default function getDefaultValues<T extends Record<'name', string>>(
  fields: T[]
): Record<string, string> {
  return fields.reduce(
    // @todo add defaultValue for resetting to
    (prev, { name }) => ({ ...prev, [name]: name === 'dial_code' ? '+1' : '' }),
    {}
  );
}
