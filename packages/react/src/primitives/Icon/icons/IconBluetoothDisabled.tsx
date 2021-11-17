import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconBluetoothDisabled = (props) => {
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
          d="M13 5.83L14.88 7.71L13.28 9.31L14.69 10.72L17.71 7.7L12 2H11V7.03L13 9.03V5.83V5.83ZM5.41 4L4 5.41L10.59 12L5 17.59L6.41 19L11 14.41V22H12L16.29 17.71L18.59 20L20 18.59L5.41 4ZM13 18.17V14.41L14.88 16.29L13 18.17Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
