import * as React from 'react';
import { Theme, Flex, Text, View } from '@aws-amplify/ui-react';
import { UpdateThemeProps } from './Context';
import { SizeToken } from './SizeToken';

interface BorderWidthEditorInterface {
  (props: {
    theme: Theme;
    updateTheme: (props: Array<UpdateThemeProps>) => void;
  }): JSX.Element;
}

export const BorderWidthsEditor: BorderWidthEditorInterface = ({
  theme,
  updateTheme,
}) => {
  if (!theme) {
    return null;
  }
  return (
    <Flex direction="column" padding="medium">
      {Object.keys(theme.tokens.borderWidths).map((key) => {
        const { value } = theme.tokens.borderWidths[key];
        return (
          <SizeToken
            pathPrefix="borderWidths"
            key={key}
            name={key}
            value={value}
            updateTheme={updateTheme}
          >
            <View
              border={`${value} solid var(--amplify-colors-border-primary)`}
              height="1rem"
            />
          </SizeToken>
        );
      })}
    </Flex>
  );
};
