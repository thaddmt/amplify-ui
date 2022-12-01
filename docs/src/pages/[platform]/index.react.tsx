import * as React from 'react';
import { useBreakpointValue } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';

import {
  A11ySection,
  AmplifySection,
  AuthenticationSection,
  CompatibleSection,
  FigmaSection,
  LiveSection,
  PrimitiveSection,
  ThemingSection,
} from '@/components/home/sections';
import { StudioSection } from '@/components/home/sections/StudioSection';
import { HomeCTA } from '@/components/home/HomeCTA';
import { LastSection } from '@/components/home/sections/LastSection';
import { CloudSection } from '@/components/home/sections/CloudSection';

const ReactHomePage = ({ colorMode }) => {
  const {
    query: { platform = 'react' },
  } = useRouter();

  const showEditor = useBreakpointValue({
    base: false,
    large: true,
  });

  return (
    <>
      {/* <FigmaSection /> */}
      <StudioSection />
      <CloudSection platform={platform} />
      <AuthenticationSection platform={platform} />

      <PrimitiveSection platform={platform} />
      <ThemingSection platform={platform} colorMode={colorMode} />

      <AmplifySection platform={platform} />
      <A11ySection platform={platform} />
      <CompatibleSection platform={platform} />

      {showEditor ? <LiveSection platform={platform} /> : null}

      <LastSection platform={platform} />
    </>
  );
};

export default ReactHomePage;
