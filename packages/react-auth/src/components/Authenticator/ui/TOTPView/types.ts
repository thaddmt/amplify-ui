import React from 'react';

import { Prettify } from '@aws-amplify/ui';
import { Button, Flex, Image, Loader } from '@aws-amplify/ui-react';

type LoaderProps = Prettify<Parameters<typeof Loader>[0]>;
export type LoaderComponent<P = {}> = React.ComponentType<LoaderProps & P>;

type TOTPQRCodeImageProps = Prettify<
  Omit<Parameters<typeof Image>[0], 'alt' | 'children' | 'src'> & {
    alt?: string;
    isLoading?: boolean;
    Loader?: LoaderComponent;
  }
>;
export type QRCodeImageComponent<P = {}> = React.ComponentType<
  TOTPQRCodeImageProps & P
>;

type TOTPCopyButtonProps = Prettify<Parameters<typeof Button>[0]>;
export type TOTPCopyButtonComponent<P = {}> = React.ComponentType<
  TOTPCopyButtonProps & P
>;

export type TOTPViewContextType = {
  copyButtonText?: string | ((hasCopied: boolean) => string) | undefined;
  totpIssuer?: string | undefined | null;
  totpSecretCode?: string | undefined | null;
  totpUsername?: string | undefined | null;
};

type TOTPViewProps = Prettify<Parameters<typeof Flex>[0]> & TOTPViewContextType;

export type TOTPViewComponent<P = {}> = React.ComponentType<TOTPViewProps & P>;
