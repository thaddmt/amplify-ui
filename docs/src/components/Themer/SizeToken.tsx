import * as React from 'react';
import {
  TextField,
  Theme,
  Flex,
  Text,
  View,
  SliderField,
  SelectField,
} from '@aws-amplify/ui-react';
import { UpdateThemeProps } from './Context';

interface SizeTokenProps {
  name: string;
  value: string;
  updateTheme: (props: Array<UpdateThemeProps>) => void;
  pathPrefix?: string;
  children?: React.ReactNode;
}

function valueToUnit(value) {
  return value.includes('rem') ? 'rem' : 'px';
}

export const SizeToken = ({
  name,
  value,
  updateTheme,
  pathPrefix = 'space',
  children,
}: SizeTokenProps) => {
  return (
    <Flex
      className="space-token"
      gap="xs"
      direction="column"
      padding="medium 0"
    >
      <Flex direction="row" alignItems="center">
        <SliderField
          flex="1"
          label={<Text fontWeight="bold">{name}</Text>}
          value={parseFloat(value)}
          step={valueToUnit(value) === 'rem' ? 0.05 : 1}
          min={0}
          max={valueToUnit(value) === 'rem' ? 10 : 100}
          onChange={(val) =>
            updateTheme([
              {
                path: `${pathPrefix}.${name}`,
                value: `${val}${valueToUnit(value)}`,
              },
            ])
          }
        />
        <TextField
          label={name}
          labelHidden
          value={parseFloat(value)}
          onChange={(e) =>
            updateTheme([
              { path: `${pathPrefix}.${name}`, value: e.target.value },
            ])
          }
        />
        <SelectField
          label="unit"
          labelHidden
          options={['rem', 'px']}
          value={valueToUnit(value)}
          onChange={(e) => {
            const updatedValue =
              e.target.value === 'px'
                ? parseFloat(value) * 16
                : parseFloat(value) / 16;
            updateTheme([
              {
                path: `${pathPrefix}.${name}`,
                value: `${updatedValue}${e.target.value}`,
              },
            ]);
          }}
        ></SelectField>
      </Flex>
      {children}
    </Flex>
  );
};
