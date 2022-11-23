import { MdPlayArrow } from 'react-icons/md';
import { View, Icon } from '@aws-amplify/ui-react';
import classNames from 'classnames';
import * as React from 'react';

interface VideoProps {
  children: React.ReactNode;
  className?: string;
}

export const Video = ({ children, className }: VideoProps) => {
  const [playing, setPlaying] = React.useState(false);
  return (
    <View
      onMouseEnter={() => {
        setPlaying(true);
      }}
      onMouseLeave={() => {
        setPlaying(false);
      }}
      className={classNames(
        className,
        'docs-video',
        playing ? 'docs-video--playing' : null
      )}
    >
      <View as="span" className="docs-video__play">
        <Icon className="docs-video__play__icon" as={MdPlayArrow} />
      </View>
      <video
        width="100%"
        playsInline
        loop
        muted
        autoPlay={playing}
        className="docs-video__video"
        onMouseOver={(event) => {
          event.target.play();
        }}
        onMouseOut={(event) => {
          event.target.pause();
        }}
      >
        {children}
      </video>
    </View>
  );
};
