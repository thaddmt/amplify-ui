import * as React from 'react';
import {
  TextField,
  SelectField,
  Flex,
  Button,
  SliderField,
} from '@aws-amplify/ui-react';
import { HslaColorPicker, HslaColor } from 'react-colorful';
import { colord } from 'colord';

const HSLEditor = ({ color, onChange }) => {
  const value = color.hasOwnProperty('h') ? color : colord(color).toHsl();

  return (
    <Flex direction="row" alignItems="flex-end">
      <SliderField
        label="Hue"
        type="number"
        value={parseInt(value.h)}
        min={0}
        max={360}
        step={0.1}
        onChange={(val) =>
          onChange({
            ...value,
            h: val,
          })
        }
      />
      <SliderField
        label="Saturation"
        type="number"
        value={parseInt(value.s)}
        min={0}
        max={100}
        step={0.1}
        onChange={(val) =>
          onChange({
            ...value,
            s: val,
          })
        }
      />
      <SliderField
        label="Lightness"
        value={parseInt(value.l)}
        min={0}
        max={100}
        step={0.1}
        onChange={(val) =>
          onChange({
            ...value,
            l: val,
          })
        }
      />
      <SliderField
        label="Alpha"
        value={value.a * 100}
        min={0}
        max={100}
        step={1}
        onChange={(val) =>
          onChange({
            ...value,
            a: val / 100,
          })
        }
      />
    </Flex>
  );
};

const HexEditor = ({ color, onChange }) => {
  const value = typeof color === 'string' ? color : colord(color).toHex();

  return (
    <TextField
      label="Hex"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

const RgbEditor = ({ color, onChange }) => {
  const value = color.hasOwnProperty('r') ? color : colord(color).toRgb();

  return (
    <Flex direction="row" alignItems="flex-end">
      <TextField
        label="Red"
        type="number"
        value={value.r}
        onChange={(e) =>
          onChange({
            ...value,
            r: e.target.value,
          })
        }
      />
      <TextField
        label="Green"
        type="number"
        value={value.g}
        onChange={(e) =>
          onChange({
            ...value,
            g: e.target.value,
          })
        }
      />
      <TextField
        label="Blue"
        type="number"
        value={value.b}
        onChange={(e) =>
          onChange({
            ...value,
            b: e.target.value,
          })
        }
      />
      <TextField
        label="Alpha"
        type="number"
        value={Math.round(value.a * 100) + ''}
        onChange={(e) =>
          onChange({
            ...value,
            a: (e.target.value as any) / 100,
          })
        }
      />
    </Flex>
  );
};

interface ColorEditorProps {
  color: HslaColor;
  referenceValue?: string;
  onChange: (args) => void;
}

type TempColor =
  | HslaColor
  | string
  | {
      r: number;
      g: number;
      b: number;
      a: number;
    };

enum ColorMode {
  HSL = 'HSL',
  Hex = 'Hex',
  RGB = 'RGB',
}

const ColorEditor = ({ color, onChange }: ColorEditorProps) => {
  const [colorMode, setColorMode] = React.useState<ColorMode>(ColorMode.HSL);
  const [tempColor, setTempColor] = React.useState<TempColor>(color);

  return (
    <Flex direction="row" padding="var(--amplify-space-medium)">
      <HslaColorPicker
        style={{ minWidth: '11rem' }}
        color={colord(tempColor).toHsl()}
        onChange={setTempColor}
      />
      <Flex direction="column">
        <SelectField
          label="Color mode"
          labelHidden={true}
          value={colorMode}
          onChange={(e) => setColorMode(e.target.value as ColorMode)}
        >
          <option>HSL</option>
          <option>Hex</option>
          <option>RGB</option>
        </SelectField>
        {(() => {
          switch (colorMode) {
            case 'HSL':
              return <HSLEditor color={tempColor} onChange={setTempColor} />;
            case 'Hex':
              return <HexEditor color={tempColor} onChange={setTempColor} />;
            case 'RGB':
              return <RgbEditor color={tempColor} onChange={setTempColor} />;
            default:
              return null;
          }
        })()}
        <Button
          variation="primary"
          onClick={() => onChange(colord(tempColor).toHslString())}
        >
          Save
        </Button>
      </Flex>
    </Flex>
  );
};

export default ColorEditor;
