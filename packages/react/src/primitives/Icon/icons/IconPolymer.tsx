import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconPolymer = (props) => {
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
          d="M19 4H15L7.11 16.63L4.5 12L9 4H5L0.5 12L5 20H9L16.89 7.37L19.5 12L15 20H19L23.5 12L19 4Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
