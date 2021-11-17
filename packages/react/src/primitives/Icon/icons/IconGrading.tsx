import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconGrading = (props) => {
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
          d="M4 7H20V9H4V7ZM4 13H20V11H4V13ZM4 17H11V15H4V17ZM4 21H11V19H4V21ZM15.41 18.17L14 16.75L12.59 18.16L15.41 21L20 16.42L18.58 15L15.41 18.17ZM4 3V5H20V3H4Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
