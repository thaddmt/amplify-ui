import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconLocalConvenienceStore = (props) => {
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
          d="M19 7V4H5V7H2V20H10V16H14V20H22V7H19ZM20 18H16V14H8V18H4V9H7V6H17V9H20V18ZM8 8H10V9H8V12H11V11H9V10H11V7H8V8ZM15 9H14V7H13V10H15V12H16V7H15V9Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
