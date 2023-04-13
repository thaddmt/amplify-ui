import { Prettify } from '@aws-amplify/ui';
import React from 'react';

export type PropsType<C extends React.ComponentType<any>> =
  C extends React.ComponentType<infer P> ? P : never;

export type WithContextProps<C extends React.ContextType<any>, P> = Prettify<
  C & Omit<P, keyof C>
>;
