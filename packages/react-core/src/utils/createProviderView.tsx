import React from 'react';

type ResolveProps<ViewProps, ProviderProps> = (
  props: ViewProps & ProviderProps
) => {
  providerProps: ProviderProps;
  viewProps: ViewProps;
};

type CreateProviderViewParams<
  ViewProps extends JSX.IntrinsicAttributes,
  ProviderProps
> = {
  displayName: string;
  Provider: React.ComponentType<ProviderProps & { children?: React.ReactNode }>;
  View: React.ComponentType<ViewProps>;
  resolveProps: ResolveProps<ViewProps, ProviderProps>;
};

/**
 * Creates a utility component composed of a wrapping React context Provider and child component.
 *
 * @param params
 * @returns
 */
export default function createProviderView<
  ViewProps extends JSX.IntrinsicAttributes,
  ProviderProps
>({
  Provider,
  displayName,
  resolveProps,
  View,
}: CreateProviderViewParams<ViewProps, ProviderProps>): React.ComponentType<
  ViewProps & ProviderProps
> {
  function ProviderView(props: ViewProps & ProviderProps) {
    const { providerProps, viewProps } = resolveProps(props);
    return (
      <Provider {...providerProps}>
        <View {...viewProps} />
      </Provider>
    );
  }

  ProviderView.displayName = displayName;

  return ProviderView;
}
