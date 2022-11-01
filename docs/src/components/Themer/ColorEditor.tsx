import * as React from 'react';
import {
  TextField,
  Theme,
  Flex,
  Text,
  View,
  SliderField,
  Heading,
} from '@aws-amplify/ui-react';
import { UpdateThemeProps } from './Context';
import { Swatch } from './Swatch';
import { createKeyListFromObject, resolveReference } from './utils';
import BrandColorPicker from './BrandColorPicker';

interface ColorsEditorInterface {
  (props: {
    theme: Theme;
    updateTheme: (props: Array<UpdateThemeProps>) => void;
  }): JSX.Element;
}

export const ColorsEditor: ColorsEditorInterface = ({ theme, updateTheme }) => {
  const keyList = createKeyListFromObject(theme);
  if (!theme) {
    return null;
  }
  return (
    <Flex direction="column">
      <BrandColorPicker theme={theme} updateTheme={updateTheme} />
      {/* {Object.keys(theme.tokens.colors.brand.primary).map((key) => {
        const token = theme.tokens.colors.brand.primary[key];
        return (
          <Swatch
            key={`colors.brand.primary.${key}`}
            value={resolveReference(token.value, theme)}
            name={key}
            updateTheme={updateTheme}
            themeKey={`colors.brand.primary.${key}`}
            keyList={keyList}
            referenceValue={token.value}
          />
        );
      })} */}
    </Flex>
  );
};
