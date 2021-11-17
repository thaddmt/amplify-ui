import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconNoMeetingRoom = (props) => {
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
          d="M12 4.99988V8.87988L14 10.8799V5.99988H17V13.8799L19 15.8799V3.99988H14V2.99988H6.12L8.12 4.99988H12ZM2.41 2.12988L1 3.53988L5 7.53988V18.9999H3V20.9999H14V16.5399L20.46 22.9999L21.87 21.5899L2.41 2.12988ZM12 18.9999H7V9.53988L12 14.5399V18.9999Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
