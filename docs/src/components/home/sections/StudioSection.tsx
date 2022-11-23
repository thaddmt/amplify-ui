import { useRef } from 'react';
import classNames from 'classnames';
import {
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Icon,
  Rating,
  Text,
  View,
} from '@aws-amplify/ui-react';

import { CodeHighlight } from '@/components/CodeHighlight';
import { DataIcon } from '@/components/Icons';
import { HomeCTA } from '@/components/home/HomeCTA';
import { useIntersectionObserver } from '@/components/useIntersection';
import { FigmaLogoMono } from '@/components/Logo';
import { trackScroll } from '@/utils/track';
import { Video } from '@/components/Video';
import { STUDIO_INTRO_YOUTUBE, STUDIO_SANDBOX_UI } from '@/data/links';

export const StudioSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.25,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;
  if (isVisible) {
    trackScroll('Home#Figma');
  }

  return (
    <View
      as="section"
      id="studio"
      className={classNames(
        'docs-home-section',
        'docs-burst-bg',
        'fade-in',
        isVisible && 'shown'
      )}
      ref={ref}
    >
      <Flex className="docs-home-subsection" direction="column" gap="large">
        <Heading level={2}>
          Build UI <strong>visually</strong>
        </Heading>
        <Flex
          direction={{
            base: 'column',
            large: 'row',
          }}
          gap="large"
        >
          <Flex gap="large" direction="column" alignItems="flex-start" flex="1">
            <Text className="docs-home-text">
              With Amplify Studio you can design components in Figma, bind them
              to your data, and generate production-ready React code. Go from
              design to production-ready code in minutes and eliminate the
              design-development gap.
            </Text>
          </Flex>
          <View flex="1">
            <iframe
              className="video"
              width="560"
              height="315"
              src={STUDIO_INTRO_YOUTUBE}
              title="Intro to AWS Amplify Studio | Amazon Web Services"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </View>
        </Flex>
        <Grid gap="large" templateColumns="1fr 1fr">
          <Card>
            <Text fontWeight="bold">Build pixel-perfect UIs</Text>
            <Text>
              Convert designs built in Figma to reusable React components,
              saving you from writing thousands of lines of code.
            </Text>
          </Card>
          <Card rowSpan={2}>
            <Text>Easily bind UI to data</Text>
            <Text>
              Visually connect your UI components to your backend data model
              using a point-and-click interface.
            </Text>
          </Card>
          <Card>
            <Text>Improve team collaboration</Text>
            <Text>
              Bridge the gap between design, development, and product with
              centralized workflows that mitigate costly rework.
            </Text>
          </Card>
        </Grid>
        <Flex className="docs-home-subsection--thin" direction="column">
          <HomeCTA href={STUDIO_SANDBOX_UI}>Try Amplify Studio</HomeCTA>
        </Flex>
      </Flex>
    </View>
  );
};
