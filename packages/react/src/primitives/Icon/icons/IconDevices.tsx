import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconDevices = (props) => {
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
          d="M4 6H22V4H4C2.9 4 2 4.9 2 6V17H0V20H14V17H4V6ZM23 8H17C16.45 8 16 8.45 16 9V19C16 19.55 16.45 20 17 20H23C23.55 20 24 19.55 24 19V9C24 8.45 23.55 8 23 8ZM22 17H18V10H22V17Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
