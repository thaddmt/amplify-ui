// Internal Style Dictionary methods
import deepExtend from 'style-dictionary/lib/utils/deepExtend';
import flattenProperties from 'style-dictionary/lib/utils/flattenProperties';

import { defaultTheme } from './defaultTheme';
import { Theme, BaseTheme, WebTheme, Override } from './types';
import {
  cssValue,
  cssNameTransform,
  pathObject,
  findDeprecatedStateTokens,
  pathToValue,
  STATE_NAMES,
} from './utils';
import { WebTokens } from './tokens';
import { DesignToken, WebDesignToken } from './tokens/types/designToken';

/**
 * This will take a design token and add some data to it for it
 * to be used in JS/CSS. It will create its CSS var name and update
 * the value to use a CSS var if it is a reference. It will also
 * add a `.toString()` method to make it easier to use in JS.
 *
 * We should see if there is a way to share this logic with style dictionary...
 */
function setupToken(token: DesignToken, path: Array<string>): WebDesignToken {
  const name = `--${cssNameTransform({ path })}`;
  const { value, deprecatedStateToken } = token;

  return {
    name,
    path,
    value: cssValue(token),
    original: value,
    toString: () => `var(${name})`,
    deprecatedStateToken,
  };
}

/**
 * Recursive function that will walk down the token object
 * and perform the setupToken function on each token.
 * Similar to what Style Dictionary does.
 */
function setupTokens(obj: any, path = []) {
  let tokens = {};

  if (obj.hasOwnProperty('value')) {
    return setupToken(obj, path);
  } else if (typeof obj === 'object') {
    for (const name in obj) {
      if (obj.hasOwnProperty(name)) {
        if (typeof obj[name] !== 'object') {
          // If we get to this point that means there is a 'dangling' part of the theme object
          // basically some part of the theme object that is not a design token, which is
          // anything that is not an object with a value attribute
          console.warn(
            `Non-design token found when creating the theme at path: ${path.join(
              '.'
            )}.${name}\nDid you forget to add '{value:"${obj[name]}"}'?`
          );
          // Keep the users data there just in case
          tokens[name] = obj[name];
        } else {
          tokens[name] = setupTokens(obj[name], path.concat(name));
        }
      }
    }
  }

  return tokens;
}

/**
 * This will be used like `const myTheme = createTheme({})`
 * `myTheme` can then be passed to a Provider or the generated CSS
 * can be passed to a stylesheet at build-time or run-time.
 * const myTheme = createTheme({})
 * const myOtherTheme = createTheme({}, myTheme);
 */
export function createTheme(
  theme?: Theme,
  baseTheme: BaseTheme = defaultTheme
): WebTheme {
  /*
1. find path to deprecated values in baseTheme
2. see if values exist in theme that match deprecated paths from base
3. determine non-deprecated path
4. see if values in theme exist for non-deprecated paths
5. if no value of non-deprecated exists then replace it with value of deprecated
 */
  if (theme) {
    let deprecated: pathObject[] = findDeprecatedStateTokens(baseTheme);

    deprecated.forEach((element: pathObject) => {
      //look for a deprecated value in the theme
      const path: string[] = element.path;
      const deprecatedThemeValue = pathToValue(theme, path);

      //use the deprecated path to generate the new path by replacing any state names with _{state}
      const targetPath = path.map((pathValue) => {
        if (STATE_NAMES.includes(pathValue)) {
          return `_${pathValue}`;
        }
        return pathValue;
      });

      //follow the path to determine if a value already exists within the theme for the non deprecated version
      let themeValue = theme.tokens || {};
      targetPath.every((pathValue) => {
        if (themeValue[pathValue]) {
          themeValue = themeValue[pathValue];
          return true;
        } else {
          themeValue = undefined;
          return false;
        }
      });

      //if the deprecated value exists and the non-deprecated value does not then copy the deprecated value over to the non-deprecated value
      if (deprecatedThemeValue && deprecatedThemeValue.value && !themeValue) {
        let parseTheme = theme.tokens || {};
        targetPath.forEach((pathValue) => {
          parseTheme[pathValue] = parseTheme[pathValue] || {};
          parseTheme = parseTheme[pathValue];
        });
        (parseTheme as DesignToken).value = deprecatedThemeValue.value;
      }
    });
  }

  // merge theme and baseTheme to get a complete theme
  // deepExtend is an internal Style Dictionary method
  // that performs a deep merge on n objects. We could change
  // this to another 3p deep merge solution too.
  const mergedTheme: BaseTheme = deepExtend([{}, baseTheme, theme]);

  // Setting up the tokens. This is similar to what Style Dictionary
  // does. At the end of this, each token should have:
  // - CSS variable name of itself
  // - its value (reference to another CSS variable or raw value)
  const tokens = setupTokens(mergedTheme.tokens) as WebTokens; // Setting the type here because setupTokens is recursive

  const { breakpoints, name } = mergedTheme;

  // flattenProperties is another internal Style Dictionary function
  // that creates an array of all tokens.
  let cssText =
    `[data-amplify-theme="${name}"] {\n` +
    flattenProperties(tokens)
      .filter((token) => {
        if (token.deprecatedStateToken) {
          return false;
        }
        return true;
      })
      .map((token) => `${token.name}: ${token.value};`)
      .join('\n') +
    `\n}\n`;

  let overrides: Array<Override> = [];

  /**
   * For each override, we setup the tokens and then generate the CSS.
   * This allows us to have one single CSS string for all possible overrides
   * and avoid re-renders in React, but also support other frameworks as well.
   */
  if (mergedTheme.overrides) {
    overrides = mergedTheme.overrides.map((override) => {
      const tokens = setupTokens(override.tokens);
      const customProperties = flattenProperties(tokens)
        .filter((token) => {
          return !token.deprecatedStateToken;
        })
        .map((token) => `${token.name}: ${token.value};`)
        .join('\n');
      // Overrides can have a selector, media query, breakpoint, or color mode
      // for creating the selector
      if ('selector' in override) {
        cssText += `\n${override.selector} {\n${customProperties}\n}\n`;
      }
      if ('mediaQuery' in override) {
        cssText += `\n@media (${override.mediaQuery}) {
  [data-amplify-theme="${name}"] {
    ${customProperties}
  }
}\n`;
      }
      if ('breakpoint' in override) {
        const breakpoint = mergedTheme.breakpoints.values[override.breakpoint];
        cssText += `\n@media (min-width: ${breakpoint}px) {
  [data-amplify-theme="${name}"] {
    ${customProperties}
  }
}\n`;
      }
      if ('colorMode' in override) {
        cssText += `\n@media (prefers-color-scheme: ${override.colorMode}) {
          [data-amplify-theme="${name}"][data-amplify-color-mode="system"] {\n${customProperties}\n}
        }\n`;
        cssText += `\n[data-amplify-theme="${name}"][data-amplify-color-mode="${override.colorMode}"] {\n${customProperties}\n}\n`;
      }

      return {
        ...override,
        tokens,
      };
    });
  }

  return {
    tokens,
    breakpoints,
    name,
    cssText,
    // keep overrides separate from base theme
    // this allows web platforms to use plain CSS scoped to a
    // selector and only override the CSS vars needed. This
    // means we could generate CSS at build-time in a postcss
    // plugin, or do it at runtime and inject the CSS into a
    // style tag.
    // This also allows RN to dynamically switch themes in a
    // provider.
    overrides,
  };
}
