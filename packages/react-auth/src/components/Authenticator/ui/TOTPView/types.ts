import React from 'react';

import { Prettify } from '@aws-amplify/ui';
import { Button, Flex, Image, Loader } from '@aws-amplify/ui-react';

type LoaderProps = Prettify<Parameters<typeof Loader>[0]>;
export type LoaderComponent<P = {}> = React.ComponentType<LoaderProps & P>;

export type TOTPQRCodeImageProps = Prettify<
  Omit<Parameters<typeof Image>[0], 'alt' | 'src'> & {
    alt?: string;
    isLoading?: boolean;
    Loader?: LoaderComponent;
  }
>;

export type TOTPCopyButtonProps = Prettify<Parameters<typeof Button>[0]>;

export type TOTPViewProps = Prettify<Parameters<typeof Flex>[0]>;
