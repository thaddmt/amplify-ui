import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconUnfoldLess = (props) => {
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
          d="M7.41016 18.59L8.83016 20L12.0002 16.83L15.1702 20L16.5802 18.59L12.0002 14L7.41016 18.59ZM16.5902 5.41L15.1702 4L12.0002 7.17L8.83016 4L7.41016 5.41L12.0002 10L16.5902 5.41Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
