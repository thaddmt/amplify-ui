import React from 'react';

type ResolveProps<ViewProps, ProviderProps> = (
  props: ViewProps & ProviderProps
) => {
  providerProps: ProviderProps;
  viewProps: ViewProps;
};

type ComposeProviderViewParams<ViewProps, ProviderProps> = {
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
export default function composeProviderView<ViewProps, ProviderProps>({
  Provider,
  displayName,
  resolveProps,
  View,
}: ComposeProviderViewParams<ViewProps, ProviderProps>): React.ComponentType<
  ViewProps & ProviderProps
> {
  function ProviderView(props: ViewProps & ProviderProps) {
    const { providerProps, viewProps } = resolveProps(props);

    return (
      <Provider {...providerProps}>
        <View {...(viewProps as ViewProps & JSX.IntrinsicAttributes)} />
      </Provider>
    );
  }

  ProviderView.displayName = displayName;

  return ProviderView;
}
