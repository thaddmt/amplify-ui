import { Theme } from '@aws-amplify/ui-react';

export const createKeyListFromObject = (obj: Object) => {
  const flatArray = [];
  const path = [];

  function dig(obj?: Object) {
    if (!obj) return; //excluding falsy values
    if (obj !== Object(obj)) {
      const objectKey = path
        .join('.')
        .replace(/\.value/g, '')
        .toLowerCase();
      if (
        objectKey.includes('color') ||
        objectKey.includes('backgroundColor') ||
        objectKey.includes('borderColor')
      ) {
        // for now we only include the color references
        return flatArray.push(`{${objectKey}}`);
      } else {
        return flatArray;
      }
    }

    for (let key in obj) {
      path.push(key);
      dig(obj[key]);
      path.pop();
    }
  }

  dig(obj);
  return flatArray;
};

export const resolveReference = (referenceValue: string, theme: Theme) => {
  const regex = /{[^{].*[^}]}/;
  if (regex.test(referenceValue)) {
    const match = regex.exec(referenceValue)[0];
    const reference = match.substring(1, match.length - 1);
    const keys = reference.split('.');
    let currentPosition: {} = theme.tokens;
    keys.forEach((key) => {
      if (
        typeof currentPosition === 'object' &&
        key in currentPosition &&
        typeof currentPosition[key] === 'object'
      ) {
        currentPosition = currentPosition[key];
      }
    });
    if ('value' in currentPosition) {
      if (regex.test(currentPosition['value'])) {
        return resolveReference(currentPosition['value'], theme);
      } else {
        return currentPosition['value'];
      }
    }
  } else {
    //either the value has been resolved or it can't be resolved
    return referenceValue;
  }
};
