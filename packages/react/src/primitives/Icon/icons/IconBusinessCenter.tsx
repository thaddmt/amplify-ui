import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconBusinessCenter = (props) => {
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
          d="M20 7H16V5L14 3H10L8 5V7H4C2.9 7 2 7.9 2 9V14C2 14.75 2.4 15.38 3 15.73V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V15.72C21.59 15.37 22 14.73 22 14V9C22 7.9 21.1 7 20 7ZM10 5H14V7H10V5ZM4 9H20V14H15V11H9V14H4V9ZM13 15H11V13H13V15ZM19 19H5V16H9V17H15V16H19V19Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
