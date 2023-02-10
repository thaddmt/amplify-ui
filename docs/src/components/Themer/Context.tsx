import * as React from 'react';
import deepExtend from 'style-dictionary/lib/utils/deepExtend';
import {
  Theme,
  defaultTheme,
  defaultDarkModeOverride,
} from '@aws-amplify/ui-react';

export interface UpdateThemeProps {
  path: string;
  value: string | number;
  root?: string;
}

export interface ThemerContextType {
  theme: Theme;
  resetTheme?: (props?: Theme) => void;
  updateTheme?: (props: Array<UpdateThemeProps>) => void;
}

export const ThemerContext = React.createContext<ThemerContextType>({
  theme: defaultTheme,
});

const modifyTheme = ({ path, value, root = 'tokens', theme }) => {
  let currentThemeSelection = theme[root];
  const themeKeys = path.split('.');
  let valueType = root === 'tokens' ? 'string' : 'number';
  let nextThemeSelection;
  themeKeys.forEach((value: string) => {
    nextThemeSelection = currentThemeSelection[value];
    if (typeof nextThemeSelection === valueType || !nextThemeSelection) return;
    currentThemeSelection = nextThemeSelection;
  });
  if (currentThemeSelection.value !== undefined) {
    currentThemeSelection.value = value;
  } else if (currentThemeSelection[themeKeys.at(-1)] !== undefined) {
    if (value.match(/^[0-9]*$/) === null) {
      console.log({ error: 'Breakpoint value must be a number', ...theme });
      return;
    }
    currentThemeSelection[themeKeys.at(-1)] = Number(value);
  }
};

export const ThemerProvider = ({ children }) => {
  const [theme, setTheme] = React.useState<Theme>({
    ...defaultTheme,
    name: 'custom-theme',
    overrides: [defaultDarkModeOverride],
  });

  const resetTheme = (theme) => {
    if (theme) {
      setTheme(deepExtend([{}, defaultTheme, theme]));
    } else {
      setTheme({
        ...defaultTheme,
        name: 'custom-theme',
        overrides: [defaultDarkModeOverride],
      });
    }
  };

  const updateTheme = (updates: Array<UpdateThemeProps>) => {
    const newTheme = deepExtend([{}, theme]);

    updates.forEach((update) => {
      modifyTheme({ ...update, theme: newTheme });
    });

    setTheme(newTheme);
  };

  return (
    <ThemerContext.Provider value={{ theme, updateTheme, resetTheme }}>
      <div className="docs-themer">{children}</div>
    </ThemerContext.Provider>
  );
};
