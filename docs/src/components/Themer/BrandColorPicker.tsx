import React from 'react';
import { Flex, Menu, Theme, Text, View, Heading } from '@aws-amplify/ui-react';
import { get, capitalize } from 'lodash';
import { colord } from 'colord';
import Values from 'values.js';
import { hex } from 'color-convert';

import ColorEditor from './ColorTokenEditor';
import { resolveReference } from './utils';
import { Swatch } from './Swatch';
import { UpdateThemeProps } from './Context';

const colorTypes = [
  'red',
  'yellow',
  'green',
  'teal',
  'blue',
  'purple',
  'pink',
  'neutral',
];
const shades = ['10', '20', '40', '60', '80', '90', '100'];
const brands = ['primary', 'secondary'];
const customColorValues = [50, 40, 20, 0, 20, 40, 50];

interface BrandProps {
  updateTheme: (props: Array<UpdateThemeProps>) => void;
  theme: Theme;
}

export default function BrandColorPicker({ updateTheme, theme }: BrandProps) {
  const handleClick = (color: string, brand: string) => {
    updateTheme(
      shades.map((shade) => ({
        path: `colors.brand.${brand}.${shade}`,
        value: `{colors.${color}.${shade}.value}`,
      }))
    );
  };

  const getBrandHslColor = (brand: string) => {
    const brandValue = theme.tokens.colors.brand[brand][60].value;
    const value = get(theme, brandValue.replace(/{|}/g, ''));
    return colord(value).toHsl();
  };

  const onSaveCustomColor = function (color: string, brand: string): void {
    shades.forEach((shade, idx) => {
      const customValue = new Values(color);
      const hexValue =
        idx > 2
          ? customValue.shade(customColorValues[idx]).hex
          : customValue.tint(customColorValues[idx]).hex;
      const hslValues = hex.hsl(hexValue);
      updateTheme([
        {
          path: `colors.brand.${brand}.${shade}`,
          value: `hsl(${hslValues[0]}, ${hslValues[1]}%, ${hslValues[2]}%)`,
        },
      ]);
    });
  };

  const { tokens } = theme;
  return (
    <>
      {brands.map((brand) => {
        const selected = tokens.colors.brand[brand][60].value.includes('hsl');
        const customBackgroundColor =
          get(
            theme,
            tokens.colors.brand[brand][60].value.replace(/{|}/g, '')
          ) || tokens.colors.brand[brand][60].value;
        const brandClassName = `brand-color-picker ${
          selected ? 'selected' : ''
        }`;
        return (
          <View key={brand}>
            <Heading level={3}>{capitalize(brand) + ' color'}</Heading>
            <Flex direction="row" whiteSpace="nowrap" padding="medium 0">
              <View>
                <Text>Custom color</Text>
                <Menu
                  trigger={
                    <View className={brandClassName}>
                      <View
                        className="brand-color-picker-swatch"
                        backgroundColor={customBackgroundColor}
                      />
                    </View>
                  }
                >
                  <ColorEditor
                    onChange={(color) => onSaveCustomColor(color, brand)}
                    color={getBrandHslColor(brand)}
                    referenceValue={'custom'}
                  />
                </Menu>
              </View>
              <View>
                <Text>Color presets</Text>
                <Flex direction="row">
                  {colorTypes.map((color) => {
                    const selected =
                      tokens.colors.brand[brand][60].value.includes(color);
                    const className = `brand-color-picker ${
                      selected ? 'selected' : ''
                    }`;
                    return (
                      <div
                        className={className}
                        key={color + brand}
                        onClick={() => handleClick(color, brand)}
                      >
                        <div
                          style={{
                            backgroundColor: tokens.colors[color][60].value,
                          }}
                        ></div>
                      </div>
                    );
                  })}
                </Flex>
              </View>
            </Flex>

            <Flex
              direction="row"
              justifyContent="stretch"
              gap="0"
              padding="medium 0"
            >
              {Object.keys(tokens.colors.brand[brand]).map((key) => {
                const path = `colors.brand.${brand}.${key}`;
                const { value } = tokens.colors.brand[brand][key];
                return (
                  <Swatch
                    key={key}
                    value={resolveReference(value, theme)}
                    name={key}
                    updateTheme={updateTheme}
                    themeKey={path}
                    referenceValue={value}
                  />
                );
              })}
            </Flex>
          </View>
        );
      })}
    </>
  );
}
