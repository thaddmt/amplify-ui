import {
  Button,
  Expander,
  Flex,
  ExpanderItem,
  Theme,
  Text,
  ToggleButtonGroup,
  ToggleButton,
} from '@aws-amplify/ui-react';
import * as React from 'react';
import { SpaceEditor } from './SpaceEditor';
import { ThemerContext } from './Context';
import { FontSizesEditor } from './FontSizeEditor';
import { ColorsEditor } from './ColorEditor';
import synthwaveTheme from '../home/themes/synthwaveTheme';
import terminalTheme from '../home/themes/terminalTheme';
import classicTheme from '../home/themes/classicTheme';
import { BorderWidthsEditor } from './BorderWidthsEditor';

const themes = {
  default: undefined,
  synthwave: synthwaveTheme,
  terminal: terminalTheme,
  classic: classicTheme,
};

export const ThemerEditor = () => {
  const { theme, updateTheme, resetTheme } = React.useContext(ThemerContext);
  const [starter, setStarter] = React.useState('default');

  return (
    <Flex direction="column">
      <Text>Pick a theme starter:</Text>
      <ToggleButtonGroup
        isExclusive
        isSelectionRequired
        value={starter}
        onChange={(value) => {
          setStarter(value as string);
          resetTheme(themes[value as string]);
        }}
      >
        <ToggleButton value="default">Default</ToggleButton>
        <ToggleButton value="synthwave">Synthwave</ToggleButton>
        <ToggleButton value="terminal">Terminal</ToggleButton>
        <ToggleButton value="classic">Classic</ToggleButton>
      </ToggleButtonGroup>

      <Text>Customize it:</Text>
      <Expander isCollapsible type="multiple" defaultValue={['colors']}>
        <ExpanderItem title="Colors" value="colors">
          <ColorsEditor theme={theme} updateTheme={updateTheme} />
        </ExpanderItem>
        <ExpanderItem title="Space" value="space">
          <SpaceEditor theme={theme} updateTheme={updateTheme} />
        </ExpanderItem>
        <ExpanderItem title="Font Sizes" value="font-sizes">
          <FontSizesEditor theme={theme} updateTheme={updateTheme} />
        </ExpanderItem>
        <ExpanderItem title="Border widths" value="border-widths">
          <BorderWidthsEditor theme={theme} updateTheme={updateTheme} />
        </ExpanderItem>
      </Expander>
    </Flex>
  );
};
