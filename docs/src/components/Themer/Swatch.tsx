import React, { useState, useEffect } from 'react';
import { HslaColor } from 'react-colorful';
import { colord } from 'colord';
import {
  Text,
  View,
  Tabs,
  TabItem,
  TextField,
  Flex,
  Menu,
} from '@aws-amplify/ui-react';
import ColorEditor from './ColorTokenEditor';
import { UpdateThemeProps } from './Context';

type SwatchPropsType = {
  name: string;
  value: string;
  updateTheme: (props: Array<UpdateThemeProps>) => void;
  themeKey: string;
  keyList?: string[];
  referenceValue: string;
};

const SwatchEditor = ({ color, onChange, referenceValue }) => {
  const defaultIndex = referenceValue.includes('{') ? 1 : 0;
  const [index, setIndex] = React.useState<number>(defaultIndex);
  const [referenceInputValue, setReferenceInputValue] =
    useState<string>(referenceValue);
  useEffect(() => {
    setReferenceInputValue(referenceValue);
  }, [referenceValue]);

  const handleReferenceInput = (e) => {
    setReferenceInputValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <View className="docs-swatch-editor">
      <Tabs currentIndex={index} onChange={(e) => setIndex(e as number)}>
        <TabItem title="Value">
          <ColorEditor
            color={color as HslaColor}
            onChange={(e) => onChange(e)}
          />
        </TabItem>
        <TabItem title="Reference">
          <View padding="var(--amplify-space-medium)">
            <TextField
              label="Value"
              labelHidden
              value={referenceInputValue}
              onChange={handleReferenceInput}
            />
          </View>
        </TabItem>
      </Tabs>
    </View>
  );
};

export function ComponentSwatch({
  name,
  value,
  updateTheme,
  themeKey,
  referenceValue,
}: SwatchPropsType) {
  const color: HslaColor = colord(value).toHsl();
  const hex: string = colord(color).toHex();

  const updateColor = function (inputValue: string, path: string): void {
    updateTheme([{ value: inputValue, path }]);
  };

  return (
    <View className="component-swatch">
      <Flex direction="row">
        <View
          style={{
            width: '50px',
            height: '50px',
            backgroundColor: hex,
          }}
        />
        <View>
          <Text fontWeight={600}>{name}</Text>
          <Text>{referenceValue}</Text>
        </View>
      </Flex>
      <SwatchEditor
        color={color}
        referenceValue={referenceValue}
        onChange={(color: string) => updateColor(color, themeKey)}
      />
    </View>
  );
}

export function Swatch({
  name,
  value,
  updateTheme,
  themeKey,
  referenceValue,
}: SwatchPropsType) {
  const color: HslaColor = colord(value).toHsl();
  const hex: string = colord(color).toHex();

  const textColor = colord(hex).isReadable('#fff') ? `#fff` : `#000`;
  // const textColor = `#000`;
  // console.log(colord('#fff'));

  const updateColor = function (inputValue: string, path: string): void {
    updateTheme([{ value: inputValue, path }]);
  };

  return (
    <Menu
      trigger={
        <View
          className="swatch"
          backgroundColor={hex}
          flex="1"
          padding="medium"
          textAlign="center"
          style={{ position: 'relative' }}
        >
          <View className="swatch-inner">
            <Text color={textColor}>{name}</Text>
          </View>
        </View>
      }
    >
      <SwatchEditor
        color={color}
        referenceValue={referenceValue}
        onChange={(color: string) => updateColor(color, themeKey)}
      />
    </Menu>
  );
}
