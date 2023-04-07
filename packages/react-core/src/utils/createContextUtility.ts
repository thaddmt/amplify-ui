import { createContext, useContext } from 'react';

/**
 * Utility function for creating a React context and hook
 *
 * @param defaultValue default context value
 * @returns React context and hook
 */
export default function createContextUtility<Type>(
  defaultValue: Type
): [React.Context<Type>, () => Type] {
  const Context = createContext<Type>(defaultValue);
  return [Context, () => useContext(Context)];
}
