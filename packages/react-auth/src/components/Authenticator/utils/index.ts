import { capitalize } from '@aws-amplify/ui';

export function createDisplayName<T extends string>(
  componentName: T
): `Authenticator.${Capitalize<T>}` {
  return `Authenticator.${capitalize(componentName)}`;
}
