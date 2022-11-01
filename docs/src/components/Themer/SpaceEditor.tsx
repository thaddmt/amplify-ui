import * as React from 'react';
import { Theme, Flex, View } from '@aws-amplify/ui-react';
import { UpdateThemeProps } from './Context';
import { SizeToken } from './SizeToken';

interface SpaceEditorInterface {
  (props: {
    theme: Theme;
    updateTheme: (props: Array<UpdateThemeProps>) => void;
  }): JSX.Element;
}

const SpaceTokenExample = () => (
  <View width="1.5rem" height="1.5rem" backgroundColor="background.tertiary" />
);

export const SpaceEditor: SpaceEditorInterface = ({ theme, updateTheme }) => {
  if (!theme) {
    return null;
  }
  return (
    <Flex direction="column" padding="medium">
      {Object.keys(theme.tokens.space)
        .filter((key) => key !== 'relative')
        .map((key) => {
          const { value } = theme.tokens.space[key];
          return (
            <SizeToken
              pathPrefix="space"
              key={key}
              name={key}
              value={value}
              updateTheme={updateTheme}
            >
              <Flex
                direction="row"
                gap={value}
                flex="1"
                justifyContent="flex-start"
              >
                <SpaceTokenExample />
                <SpaceTokenExample />
                <SpaceTokenExample />
                <SpaceTokenExample />
              </Flex>
            </SizeToken>
          );
        })}
    </Flex>
  );
};
