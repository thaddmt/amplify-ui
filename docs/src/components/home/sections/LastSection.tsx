import { useRef } from 'react';
import classNames from 'classnames';
import { Heading, Link, View, Flex } from '@aws-amplify/ui-react';
import { AmplifyIcon, ServerIcon, LibraryIcon } from '@/components/Icons';
import { useIntersectionObserver } from '@/components/useIntersection';
import { HomeFeatureCard } from '../HomeFeatureCard';
import { trackScroll } from '@/utils/track';
import { FRAMEWORK_INSTALL_SCRIPTS } from '@/data/frameworks';
import { TerminalCommand } from '@/components/InstallScripts';
import { HomeCTA } from '../HomeCTA';

export const LastSection = ({ platform }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.125,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;
  if (isVisible) {
    trackScroll('Home#Last');
  }

  const frameworkInstallScript = FRAMEWORK_INSTALL_SCRIPTS[platform.toString()];

  return (
    <View
      ref={ref}
      as="section"
      testId="docs-home-section"
      className={classNames(
        'docs-home-section',
        'fade-in',
        isVisible && 'shown'
      )}
    >
      <Flex direction="column" className="docs-home-subsection--thin">
        <Flex direction="row">
          <HomeCTA href={`/${platform}/getting-started/installation`}>
            Get started
          </HomeCTA>
          <TerminalCommand command={frameworkInstallScript} />
        </Flex>
      </Flex>
    </View>
  );
};
