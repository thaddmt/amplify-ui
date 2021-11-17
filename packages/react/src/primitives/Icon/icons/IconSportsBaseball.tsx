import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconSportsBaseball = (props) => {
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
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM5.61 16.78C4.6 15.45 4 13.8 4 12C4 10.2 4.6 8.55 5.61 7.22C7.06 8.31 8 10.05 8 12C8 13.95 7.06 15.69 5.61 16.78ZM12 20C10.11 20 8.37 19.34 7 18.24C8.83 16.77 10 14.53 10 12C10 9.47 8.83 7.23 7 5.76C8.37 4.66 10.11 4 12 4C13.89 4 15.63 4.66 17 5.76C15.17 7.23 14 9.47 14 12C14 14.53 15.17 16.77 17 18.24C15.63 19.34 13.89 20 12 20ZM18.39 16.78C16.94 15.69 16 13.95 16 12C16 10.05 16.94 8.31 18.39 7.22C19.4 8.55 20 10.2 20 12C20 13.8 19.4 15.45 18.39 16.78Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
