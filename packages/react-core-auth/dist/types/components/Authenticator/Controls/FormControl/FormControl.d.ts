import React from 'react';
import { FormProviderProps } from '@aws-amplify/ui-react-core';
import { FormComponent, Platform } from '../../Provider';
type FormControlProps<T> = React.ComponentProps<FormComponent<T>>;
export declare function FormControl<T extends Platform = Platform>({ mode, ...rest }: FormControlProps<T> & Pick<FormProviderProps, 'mode'>): JSX.Element;
export {};
