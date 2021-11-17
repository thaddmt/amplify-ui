import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconChargingStation = (props) => {
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
          d="M14.5 11L11.5 17V13H9.5L12.5 7V11H14.5ZM17 3H7V4H17V3ZM17 20H7V21H17V20ZM17 1C18.1 1 19 1.9 19 3V21C19 22.1 18.1 23 17 23H7C5.9 23 5 22.1 5 21V3C5 1.9 5.9 1 7 1H17ZM7 18H17V6H7V18Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
