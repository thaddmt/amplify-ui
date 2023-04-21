import { Prettify } from '@aws-amplify/ui';
import React from 'react';

export type WithContextProps<C extends React.ContextType<any>, P> = Prettify<
  C & Omit<P, keyof C>
>;
