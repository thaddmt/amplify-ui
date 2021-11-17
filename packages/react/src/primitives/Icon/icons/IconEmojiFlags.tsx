import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconEmojiFlags = (props) => {
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
          d="M14 9L13 7H7V5.72C7.6 5.38 8 4.74 8 4C8 2.9 7.1 2 6 2C4.9 2 4 2.9 4 4C4 4.74 4.4 5.38 5 5.72V21H7V17H12L13 19H20V9H14ZM18 17H14L13 15H7V9H12L13 11H18V17Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
