import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconFoodBank = (props) => {
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
          d="M12 5.5L18 10V19H6V10L12 5.5ZM12 3L4 9V21H20V9L12 3ZM11.5 9.5V12.5H11V9.5H10V12.5H9.5V9.5H8.5V12.5C8.5 13.33 9.17 14 10 14V18H11V14C11.83 14 12.5 13.33 12.5 12.5V9.5H11.5ZM13 11.5V14.5H14V18H15V9.5C13.9 9.5 13 10.4 13 11.5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
