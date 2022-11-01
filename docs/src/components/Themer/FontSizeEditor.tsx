import * as React from 'react';
import { Theme, Flex, Text } from '@aws-amplify/ui-react';
import { UpdateThemeProps } from './Context';
import { SizeToken } from './SizeToken';

interface SpaceEditorInterface {
  (props: {
    theme: Theme;
    updateTheme: (props: Array<UpdateThemeProps>) => void;
  }): JSX.Element;
}

export const FontSizesEditor: SpaceEditorInterface = ({
  theme,
  updateTheme,
}) => {
  if (!theme) {
    return null;
  }
  return (
    <Flex direction="column" padding="var(--amplify-space-medium">
      {Object.keys(theme.tokens.fontSizes).map((key) => {
        const { value } = theme.tokens.fontSizes[key];
        return (
          <SizeToken
            pathPrefix="fontSizes"
            key={key}
            name={key}
            value={value}
            updateTheme={updateTheme}
          >
            <Text fontSize={value}>Lorem ipsum</Text>
          </SizeToken>
        );
      })}
    </Flex>
  );
};
