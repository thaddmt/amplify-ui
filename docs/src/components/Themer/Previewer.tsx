import {
  Button,
  ThemeProvider,
  View,
  Flex,
  Authenticator,
  TextField,
  Tabs,
  TabItem,
  SwitchField,
  CheckboxField,
  RadioGroupField,
  Radio,
} from '@aws-amplify/ui-react';
import * as React from 'react';
import { CodeHighlight } from '../CodeHighlight';
import { ThemerContext } from './Context';

const Buttons = ({ size }) => (
  <Flex direction="row">
    <Button size={size}>Default</Button>
    <Button size={size} variation="primary">
      Primary
    </Button>
    <Button size={size} variation="link">
      Link
    </Button>
  </Flex>
);

const TextFields = ({ size }) => (
  <Flex direction="row">
    <TextField size={size} label="text field" />
    <TextField size={size} variation="quiet" label="quiet" />
  </Flex>
);

const SwitchFields = ({ size }) => (
  <Flex direction="row">
    <SwitchField size={size} isChecked label="Label" labelHidden />
    <SwitchField size={size} label="Label" labelHidden />
    <CheckboxField
      size={size}
      checked
      label="Label"
      name={`checkbox-${size}`}
      value="testing"
    />
    <CheckboxField
      size={size}
      label="Label"
      name={`checkbox-${size}`}
      value="testing"
    />
    <RadioGroupField
      size={size}
      label="Language"
      name={`${size}-radio-group`}
      defaultValue={`${size}-radio-css`}
      direction="row"
      gap="small"
      labelHidden
    >
      <Radio value={`${size}-radio-html`}>HTML</Radio>
      <Radio value={`${size}-radio-css`}>CSS</Radio>
      <Radio value={`${size}-radio-javascript`}>javascript</Radio>
    </RadioGroupField>
  </Flex>
);

export const ThemerPreviewer = ({ colorMode }) => {
  const { theme } = React.useContext(ThemerContext);
  console.log(colorMode);
  return (
    <Tabs>
      <TabItem title="Preview">
        <ThemeProvider theme={theme} colorMode={colorMode}>
          <Flex direction="column" padding="large">
            <Flex direction="column">
              <Buttons size="small" />
              <Buttons size="default" />
              <Buttons size="large" />
            </Flex>

            <Flex direction="column">
              <TextFields size="small" />
              <TextFields size="default" />
              <TextFields size="large" />
            </Flex>

            <Flex direction="column">
              <SwitchFields size="small" />
              <SwitchFields size="default" />
              <SwitchFields size="large" />
            </Flex>

            <Authenticator
              socialProviders={['amazon', 'apple', 'facebook', 'google']}
            />
          </Flex>
        </ThemeProvider>
      </TabItem>
      <TabItem title="Code">
        <View overflow="scroll">
          <CodeHighlight
            code={JSON.stringify(
              {
                name: 'my-theme',
                tokens: {
                  colors: theme.tokens.colors,
                  fontSizes: theme.tokens.fontSizes,
                  space: theme.tokens.space,
                },
              },
              null,
              2
            )}
            language="json"
            withLines
            withCopy
          />
        </View>
      </TabItem>
    </Tabs>
  );
};
