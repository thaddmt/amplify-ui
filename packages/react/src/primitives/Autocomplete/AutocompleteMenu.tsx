import * as React from 'react';

import { Loader } from '../Loader';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

import { ScrollView } from '../ScrollView';
import { View } from '../View';
import { ComponentClassNames } from '../shared/constants';
import { ComponentText } from '../shared/constants';
import type {
  ForwardRefPrimitive,
  Primitive,
  AutocompleteMenuProps,
  BaseAutocompleteMenuProps,
} from '../types';

const MenuHeader = ({ children }: { children?: React.ReactNode }) => {
  if (!children) {
    return null;
  }
  return (
    <View className={ComponentClassNames.AutocompleteMenuHeader}>
      {children}
    </View>
  );
};

const MenuFooter = ({ children }: { children?: React.ReactNode }) => {
  if (!children) {
    return null;
  }
  return (
    <View className={ComponentClassNames.AutocompleteMenuFooter}>
      {children}
    </View>
  );
};

const MenuLoading = ({ children }: { children?: React.ReactNode }) => {
  return (
    <View className={ComponentClassNames.AutocompleteMenuLoading}>
      {children ?? (
        <>
          <Loader />
          {ComponentText.Autocomplete.loadingText}
        </>
      )}
    </View>
  );
};

const AutocompleteMenuPrimitive: Primitive<AutocompleteMenuProps, 'div'> = (
  {
    ariaLabel,
    children,
    Header = null,
    Footer = null,
    LoadingIndicator = null,
    Empty = null,
    isLoading,
    listboxId,
    ...rest
  },
  ref
) => {
  const MenuEmpty = () =>
    Empty ? (
      <View className={ComponentClassNames.AutocompleteMenuEmpty}>{Empty}</View>
    ) : (
      <View className={ComponentClassNames.AutocompleteMenuEmpty}>
        {ComponentText.Autocomplete.emptyText}
      </View>
    );

  return (
    <ScrollView
      className={ComponentClassNames.AutocompleteMenu}
      ref={ref}
      {...rest}
    >
      {isLoading ? (
        <MenuLoading>{LoadingIndicator}</MenuLoading>
      ) : (
        <>
          <MenuHeader>{Header}</MenuHeader>
          {children.length > 0 ? (
            <ScrollView
              as="ul"
              ariaLabel={ariaLabel}
              className={ComponentClassNames.AutocompleteMenuOptions}
              id={listboxId}
              role="listbox"
            >
              {children}
            </ScrollView>
          ) : (
            <MenuEmpty />
          )}
          <MenuFooter>{Footer}</MenuFooter>
        </>
      )}
    </ScrollView>
  );
};

export const AutocompleteMenu: ForwardRefPrimitive<
  BaseAutocompleteMenuProps,
  'div'
> = React.forwardRef(AutocompleteMenuPrimitive);

AutocompleteMenu.displayName = 'AutocompleteMenu';
