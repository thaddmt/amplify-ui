import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconAnalytics = (props) => {
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
          d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"
          fill="currentColor"
        />
        <path d="M9 12H7V17H9V12Z" fill="black" />
        <path d="M17 7H15V17H17V7Z" fill="black" />
        <path d="M13 14H11V17H13V14Z" fill="black" />
        <path d="M13 10H11V12H13V10Z" fill="black" />
      </svg>
    </View>
  );
};
