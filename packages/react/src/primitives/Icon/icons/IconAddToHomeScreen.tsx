import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconAddToHomeScreen = (props) => {
  const { className, ...rest } = props;
  return (
    <View
      as="span"
      width="1em"
      height="1em"
      className={classNames(ComponentClassNames.Icon, className)}
      {...rest}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 1.01L8 1C6.9 1 6 1.9 6 3V6H8V5H18V19H8V18H6V21C6 22.1 6.9 23 8 23H18C19.1 23 20 22.1 20 21V3C20 1.9 19.1 1.01 18 1.01ZM10 15H12V8H5V10H8.59L3 15.59L4.41 17L10 11.41V15Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
